import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SeatLegend } from '../../Components/Seats/SeatLegend';
import { SeatsMap } from '../../Components/Seats/SeatMap';
import { ReservationSummary } from '../../Components/Seats/ReservationSummary';
import {  CreateReservation, GetSeats } from '../../services/Rervation';
import type { SeatDto, FunctionDto, CreateReservation as CreateReservationType } from '../../Interfaces/Reservation.type';
import styles from './ReservationPage.module.css';


export function ReservationPage() {
    const { functionId } = useParams<{ functionId: string }>();
    const navigate = useNavigate();
    const funtionIdNumber = functionId ? parseInt(functionId, 10) : null;
       
    const [seats, setSeats] = useState<SeatDto[]>([]); 
    const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);
    const [functionData] = useState<FunctionDto | null>(null);
    const [isLoadingSeats, setIsLoadingSeats] = useState(true);
    const [isLoadingReservation, setIsLoadingReservation] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [reservationCode, setReservationCode] = useState<string | null>(null);

    useEffect(() => {
        if (!funtionIdNumber) {
        setErrorMessage('ID de función inválido');
        return;
        }

        loadSeats(funtionIdNumber);
    }, [funtionIdNumber]);

        const loadSeats = async (funtionId: number) => {
            try {
                setIsLoadingSeats(true);
                setErrorMessage(null);
                const response = await GetSeats(funtionId);

                if (response.success && response.data) {
                setSeats(response.data);
                } else {
                setErrorMessage(response.message || 'Error al cargar asientos');
                }
            } catch (error) {
                console.error('[ReservationPage] Error:', error);
            } finally {
                setIsLoadingSeats(false);
            }
        };

    const handleSeatClick = (seat: SeatDto, isSelected: boolean) => {
        setErrorMessage(null);

        if (isSelected) {
            setSelectedSeatIds(prev => prev.filter(id => id !== seat.id));
        } else {
            setSelectedSeatIds(prev => [...prev, seat.id]);
        }
    };

    const handleClearSelection = () => {
        setSelectedSeatIds([]);
        setErrorMessage(null);
        setReservationCode(null);
        console.log('[ReservationPage] Selección limpiada');
    };

    const handleConfirmReservation = async (seatIds: number[]) => {
        try {
        setIsLoadingReservation(true);
        setErrorMessage(null);
        setReservationCode(null);

        if (!funtionIdNumber) {
            throw new Error('ID de función inválido');
        }

        const request: CreateReservationType = {
            FuntionId: funtionIdNumber,
            SeatIds: seatIds
        };

        console.log('[ReservationPage] Creando reserva:', request);

        const response = await CreateReservation(request);

        if (response.Success && response.Data) {
            console.log('[ReservationPage] Reserva creada:', response.Data.ReservationCode);
            setReservationCode(response.Data.ReservationCode);
            setSelectedSeatIds([]); 
            
            setTimeout(() => {
            }, 3000);
        } else {
            setErrorMessage(response.Message || 'Error al crear reserva');
        }
        } catch (error) {
        console.error('[ReservationPage] Error:', error);
        setErrorMessage(
            error instanceof Error ? error.message : 'Error al crear reserva'
        );
        } finally {
        setIsLoadingReservation(false);
        }
    };

    const selectedSeats = seats.filter(seat => selectedSeatIds.includes(seat.id));

    if (isLoadingSeats) {
        return (
        <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p>Cargando asientos...</p>
        </div>
        );
    }

    if (reservationCode) {
        return (
        <div className={styles.successContainer}>
            <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h2>¡Reserva Creada Exitosamente!</h2>
            <p className={styles.reservationCode}>
                Código de Reserva: <strong>{reservationCode}</strong>
            </p>
            <p>Guarda este código para confirmar tu entrada en la puerta.</p>
            <button
                className={styles.successButton}
                onClick={() => navigate('/MyReservations')}
            >
                Ver Mis Reservas
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
        {/* HEADER */}
        <header className={styles.header}>
            <h1>🎭 Divine Teatro - Sistema de Reservas</h1>
            <p>Selecciona tus asientos para la función</p>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className={styles.content}>
            {/* LEYENDA */}
            <SeatLegend />

            {/* MAPA DE ASIENTOS */}
            {seats.length > 0 ? (
            <SeatsMap
                seats={seats}
                selectedSeatIds={selectedSeatIds}
                onSeatClick={handleSeatClick}
            />
            ) : (
            <div className={styles.noSeats}>
                <p>No hay asientos disponibles para esta función</p>
            </div>
            )}

            {/* RESUMEN DE RESERVA */}
            <ReservationSummary
            selectedSeats={selectedSeats}
            functionName={functionData?.name || 'Función'}
            onConfirm={handleConfirmReservation}
            onClear={handleClearSelection}
            isLoading={isLoadingReservation}
            errorMessage={errorMessage || undefined}
            />
        </main>
        </div>
    );
}

export default ReservationPage;


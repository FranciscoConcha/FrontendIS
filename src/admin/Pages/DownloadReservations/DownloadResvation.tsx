import { useEffect, useState } from "react";
import {
    type MyReservationDto,
    type MyReservationsResponse,
} from "../../Interfaces/PdfDownload.type";
import { GetMyReservations, DownloadPdf } from "../../services/Rervation";
import styles from "./DownloadResvation.module.css";

export function DownloadReservations() {
    const [reservations, setReservations] = useState<MyReservationDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [downloadingCode, setDownloadingCode] = useState<string | null>(null);

    
    useEffect(() => {
        let isMounted = true;
        const loadReservations = async () => {
            try{
                setLoading(true);
                const response: MyReservationsResponse = await GetMyReservations();
                if (isMounted) {
                    if (response.success) {
                        setReservations(response.data);
                    } else {
                        setError(response.message || "Error al cargar reservas");
                    }
                }

            }catch(err) {
                if (isMounted) {
                    setError("Error de conexión al cargar reservas " + err);
                }
            }finally{
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        loadReservations();
        return () => {
            isMounted = false;
        }
    }, []);

    


    const handleDownloadPdf = async (reservationCode: string) => {
        try {
        setDownloadingCode(reservationCode);
        await DownloadPdf(reservationCode);
        } catch (err) {
        setError("Error al descargar PDF");
        console.error(err);
        } finally {
        setDownloadingCode(null);
        }
    };

    if (loading) {
        return <div className={styles.container}>Cargando reservas...</div>;
    }

    return (
        <div className={styles.container}>
        <h1>MIS RESERVAS</h1>

        {error && <div className={styles.error}>{error}</div>}

        {reservations.length === 0 ? (
            <div className={styles.emptyState}>
            <p>No tienes reservas aún</p>
            </div>
        ) : (
            <table className={styles.table}>
            <thead>
                <tr>
                <th>Código</th>
                <th>Obra</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Asientos</th>
                <th>Total</th>
                <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation) => (
                <tr key={reservation.id}>
                    <td className={styles.code}>{reservation.reservationCode}</td>
                    <td>{reservation.funtionTitle}</td>
                    <td>{new Date(reservation.dateFunction).toLocaleDateString("es-CL")}</td>
                    <td>{reservation.timeFunction}</td>
                    <td>{reservation.seatCount}</td>
                    <td>${reservation.totalPrice.toLocaleString("es-CL")}</td>
                    <td>
                    <button
                        className={styles.downloadBtn}
                        onClick={() => handleDownloadPdf(reservation.reservationCode)}
                        disabled={downloadingCode === reservation.reservationCode}
                    >
                        {downloadingCode === reservation.reservationCode
                        ? "Esperando"
                        : "PDF"}
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
}

export default DownloadReservations;
import type { SeatDto } from '../../Interfaces/Reservation.type';
import styles from './ReservationSummary.module.css';

interface ReservationSummaryProps {
  selectedSeats: SeatDto[];
  functionName: string;
  onConfirm: (seatIds: number[]) => void;
  onClear: () => void;
  isLoading?: boolean;
  errorMessage?: string;
}

export function ReservationSummary({
  selectedSeats,
  functionName,
  onConfirm,
  onClear,
  isLoading = false,
  errorMessage
}: ReservationSummaryProps) {
  
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  
  if (selectedSeats.length === 0) {
    return (
      <div className={styles.summaryContainer}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎫</div>
          <h3>No hay asientos seleccionados</h3>
          <p>Selecciona al menos un asiento para continuar</p>
        </div>
      </div>
    );
  }

  const handleConfirm = () => {
    const seatIds = selectedSeats.map(seat => seat.id);
    onConfirm(seatIds);
  };

  return (
    <div className={styles.summaryContainer}>
      {/* ENCABEZADO */}
      <div className={styles.summaryHeader}>
        <h2 className={styles.title}>Resumen de Reserva</h2>
        <span className={styles.functionName}>{functionName}</span>
      </div>

      {/* LISTA DE ASIENTOS SELECCIONADOS */}
      <div className={styles.seatsSection}>
        <h3 className={styles.sectionTitle}>
          Asientos Seleccionados ({selectedSeats.length})
        </h3>
        
        <div className={styles.seatsList}>
          {selectedSeats.map((seat) => (
            <div key={seat.id} className={styles.seatItem}>
              <div className={styles.seatInfo}>
                <span className={styles.seatNumber}>{seat.seatNumber}</span>
                <span className={styles.seatSection}>{seat.section}</span>
              </div>
              <span className={styles.seatPrice}>
                ${seat.price.toLocaleString('es-CL')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RESUMEN DE PRECIOS */}
      <div className={styles.priceBreakdown}>
        <div className={styles.priceRow}>
          <span>Subtotal ({selectedSeats.length} asientos)</span>
          <span>${totalPrice.toLocaleString('es-CL')}</span>
        </div>
        
        {/* Aquí podrías agregar descuentos, impuestos, etc */}
        
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>TOTAL A PAGAR</span>
          <span className={styles.totalAmount}>
            ${totalPrice.toLocaleString('es-CL')}
          </span>
        </div>
      </div>

      {/* MENSAJE DE ERROR */}
      {errorMessage && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}></span>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* BOTONES DE ACCIÓN */}
      <div className={styles.actions}>
        <button
          className={styles.clearButton}
          onClick={onClear}
          disabled={isLoading}
          title="Limpiar la selección de asientos"
        >
           Limpiar Selección
        </button>
        
        <button
          className={styles.confirmButton}
          onClick={handleConfirm}
          disabled={isLoading || selectedSeats.length === 0}
          title="Confirmar la reserva y pagar"
        >
          {isLoading ? (
            <>
              <span className={styles.spinner}></span>
              Procesando...
            </>
          ) : (
            <>
              ✓ Confirmar Reserva
            </>
          )}
        </button>
      </div>

      {/* NOTA DE INFORMACIÓN */}
      <div className={styles.infoNote}>
        <p>
           <strong>Nota:</strong> Los asientos se reservarán solo después de confirmar el pago.
        </p>
      </div>
    </div>
  );
}

export default ReservationSummary;
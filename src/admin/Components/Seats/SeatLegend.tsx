import { SeatLegend as SeatLegendData, SeatStatus } from '../../constants/SeatColors';
import styles from './SeatLegend.module.css';

export function SeatLegend() {
  return (
    <div className={styles.legendContainer}>
      <h3 className={styles.title}>Leyenda de Asientos</h3>
      
      <div className={styles.legendItems}>
        {/* Renderizar cada estado de la leyenda */}
        {Object.values(SeatStatus).map((statusKey) => {
          // statusKey es: 0, 1, 2 (los valores numéricos)
          // SeatLegendData[statusKey] nos da el objeto con label, color, description
          const legendItem = SeatLegendData[statusKey as keyof typeof SeatLegendData];
          
          if (!legendItem) return null; // Por si acaso

          return (
            <div key={statusKey} className={styles.legendItem}>
              {/* Cuadrado de color */}
              <div
                className={styles.seatColor}
                style={{ backgroundColor: legendItem.color }}
              />
              
              {/* Texto descriptivo */}
              <div className={styles.legendText}>
                <strong>{legendItem.label}</strong>
                <p>{legendItem.description}</p>
              </div>
            </div>
          );
        })}

        {/* Elemento adicional para "Seleccionado" */}
        <div className={styles.legendItem}>
          <div
            className={styles.seatColor}
            style={{
              backgroundColor: '#FFD700',
              boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)',
            }}
          />
          <div className={styles.legendText}>
            <strong>Seleccionado</strong>
            <p>Lo elegiste para tu reserva</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatLegend;
import type { SeatDto } from '../../Interfaces/Reservation.type';
import { getSeatColor, canSelectSeat, SectionOrder } from '../../constants/SeatColors';
import styles from './SeatMap.module.css';

interface SeatsMapProps {
  seats: SeatDto[];
  selectedSeatIds: number[];
  onSeatClick: (seat: SeatDto, isSelected: boolean) => void;
}

function groupSeatsByRow(seats: SeatDto[]): Record<string, SeatDto[]> {
  return seats.reduce((grouped, seat) => {
    const rowLetter = seat.seatNumber.match(/^[A-Z]+/)?.[0] || '';
    if (!grouped[rowLetter]) {
      grouped[rowLetter] = [];
    }
    grouped[rowLetter].push(seat);
    return grouped;
  }, {} as Record<string, SeatDto[]>);
}

function groupSeatsBySection(seats: SeatDto[]): Record<string, SeatDto[]> {
  return seats.reduce((grouped, seat) => {
    if (!grouped[seat.section]) {
      grouped[seat.section] = [];
    }
    grouped[seat.section].push(seat);
    return grouped;
  }, {} as Record<string, SeatDto[]>);
}

function sortRows(rows: string[]): string[] {
  return [...rows].sort();
}

export function SeatsMap({ seats, selectedSeatIds, onSeatClick }: SeatsMapProps) {
  const sectionGroups = groupSeatsBySection(seats);
  const orderedSections = SectionOrder.filter(section => sectionGroups[section]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TEATRO DIVINE - MAPA DE ASIENTOS</h2>
      
      <div className={styles.stageBox}>ESCENARIO</div>

      <div className={styles.allSeats}>
        {orderedSections.map((sectionName) => (
          <Section
            key={sectionName}
            sectionName={sectionName}
            seats={sectionGroups[sectionName]}
            selectedSeatIds={selectedSeatIds}
            onSeatClick={onSeatClick}
          />
        ))}
      </div>

      <div className={styles.entrance}>↑ ENTRADA PRINCIPAL</div>
    </div>
  );
}

interface SectionProps {
  sectionName: string;
  seats: SeatDto[];
  selectedSeatIds: number[];
  onSeatClick: (seat: SeatDto, isSelected: boolean) => void;
}

function Section({ sectionName, seats, selectedSeatIds, onSeatClick }: SectionProps) {
  const rowGroups = groupSeatsByRow(seats);
  const sortedRows = sortRows(Object.keys(rowGroups));

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionName}>{sectionName}</h3>
      {sortedRows.map((rowLetter) => (
        <Row
          key={rowLetter}
          rowLetter={rowLetter}
          seats={rowGroups[rowLetter]}
          selectedSeatIds={selectedSeatIds}
          onSeatClick={onSeatClick}
        />
      ))}
    </div>
  );
}

interface RowProps {
  rowLetter: string;
  seats: SeatDto[];
  selectedSeatIds: number[];
  onSeatClick: (seat: SeatDto, isSelected: boolean) => void;
}

function Row({ rowLetter, seats, selectedSeatIds, onSeatClick }: RowProps) {
  const sortedSeats = [...seats].sort((a, b) => {
    const aNum = parseInt(a.seatNumber.match(/\d+$/)?.[0] || '0', 10);
    const bNum = parseInt(b.seatNumber.match(/\d+$/)?.[0] || '0', 10);
    return aNum - bNum;
  });

  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{rowLetter}</span>
      <div className={styles.seatsRow}>
        {sortedSeats.map((seat) => (
          <SeatBtn
            key={seat.id}
            seat={seat}
            isSelected={selectedSeatIds.includes(seat.id)}
            onSeatClick={onSeatClick}
          />
        ))}
      </div>
    </div>
  );
}

interface SeatBtnProps {
  seat: SeatDto;
  isSelected: boolean;
  onSeatClick: (seat: SeatDto, isSelected: boolean) => void;
}

function SeatBtn({ seat, isSelected, onSeatClick }: SeatBtnProps) {
  const canClick = canSelectSeat(seat.status);
  const seatColor = getSeatColor(seat.status, isSelected);

  return (
    <button
      className={styles.seat}
      onClick={() => onSeatClick(seat, isSelected)}
      disabled={!canClick && !isSelected}
      style={{ backgroundColor: seatColor }}
      title={seat.seatNumber}
    >
      {seat.seatNumber.match(/\d+$/)?.[0]}
    </button>
  );
}

export default SeatsMap;
// Constantes para los colores de los asientos en el sistema de reserva de asientos
// Estos colores se pueden usar para representar el estado de cada asiento en la interfaz de usuario
// Se definen como constantes para facilitar su uso y mantenimiento en todo el proyecto
export const SeatColors = {
    available :'#00C851',
    reserved: '#f56558',
    occupied: '#999999',
    selected: '#FFD700'
} as const;

// Estilos para los asientos basados en su estado
// Estos estilos se pueden aplicar a los elementos de asiento en la interfaz de usuario para indicar visualmente su estado
export const SeatStyles = {
  available: {
    backgroundColor: SeatColors.available,
    borderColor: '#008632',
    cursor: 'pointer',
    opacity: 1
  },
  
  reserved: {
    backgroundColor: SeatColors.reserved,
    borderColor: '#c2185b',
    cursor: 'not-allowed',
    opacity: 0.7
  },
  
  occupied: {
    backgroundColor: SeatColors.occupied,
    borderColor: '#666666',
    cursor: 'not-allowed',
    opacity: 0.5
  },
  
  selected: {
    backgroundColor: SeatColors .selected,
    borderColor: '#FFA500',
    cursor: 'pointer',
    opacity: 1,
    boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)'
  }
} as const;
// Constantes para los estados de los asientos
// Estos valores se pueden usar para representar el estado de cada asiento en la lógica de la aplicación
export const SeatStatus = {
  AVAILABLE: 0,
  RESERVED: 1,
  OCCUPIED: 2
} as const;
// Leyenda para los estados de los asientos
// Esta leyenda se puede mostrar en la interfaz de usuario para ayudar a los usuarios a entender el significado de cada color de asiento
export const SeatLegend = {
  [SeatStatus.AVAILABLE]: {
    label: 'Disponible',
    color: SeatColors.available,
    description: 'Puedes reservar este asiento'
  },
  [SeatStatus.RESERVED]: {
    label: 'Reservado',
    color: SeatColors.reserved,
    description: 'Ya está reservado'
  },
  [SeatStatus.OCCUPIED]: {
    label: 'Ocupado',
    color: SeatColors.occupied,
    description: 'Ya está ocupado'
  }
} as const;

export const SeatPrices = {
  'VIP Divine': 85000,
  'Platea': 45000,
  'Anfiteatro': 28000,
  'Galería': 18000,
  'Palco Izquierdo': 60000,
  'Palco Derecho': 60000
} as const;

export const SectionOrder = [
    'VIP Divine',
    'Palco Izquierdo',
    'Palco Derecho',
    'Platea',
    'Anfiteatro',
    'Galería'
] as const;

export const SeatDimension = {
  width: 15,           
  height: 15,          
  gap: 8,            
  borderRadius: 4      
} as const;

/**
 * Función para obtener el color de un asiento basado en su estado y si está seleccionado
 * @param status Estado del asiento (disponible, reservado, ocupado)
 * @param isSelected Indica si el asiento está seleccionado
 * @returns El color correspondiente al estado del asiento
 */
export function getSeatColor(status: number, isSelected: boolean = false): string {
  if (isSelected) return SeatColors.selected;
  
  switch (status) {
    case SeatStatus.AVAILABLE:
      return SeatColors.available;
    case SeatStatus.RESERVED:
      return SeatColors.reserved;
    case SeatStatus.OCCUPIED:
      return SeatColors.occupied;
    default:
      return SeatColors.available;
  }
}
/**
 * Función para obtener los estilos de un asiento basado en su estado y si está seleccionado
 * @param status Estado del asiento (disponible, reservado, ocupado)
 * @param isSelected Asiento seleccionado o no
 * @returns Los estilos correspondientes al estado del asiento
 */
export function getSeatStyles(status: number, isSelected: boolean = false) {
  if (isSelected) return SeatStyles.selected;
  
  switch (status) {
    case SeatStatus.AVAILABLE:
      return SeatStyles.available;
    case SeatStatus.RESERVED:
      return SeatStyles.reserved;
    case SeatStatus.OCCUPIED:
      return SeatStyles.occupied;
    default:
      return SeatStyles.available;
  }
}
/**
 * Función para determinar si un asiento puede ser seleccionado basado en su estado
 * @param status Estado del asiento (disponible, reservado, ocupado)
 * @returns Es true si el asiento está disponible y puede ser seleccionado, false en caso contrario
 */
export function canSelectSeat(status: number): boolean {
  return status === SeatStatus.AVAILABLE;
}
/**
 * Función para obtener la etiqueta de un asiento basado en su estado
 * @param status Estado del asiento (disponible, reservado, ocupado)
 * @returns La etiqueta correspondiente al estado del asiento
 */
export function getStatusLabel(status: number): string {
  switch (status) {
    case SeatStatus.AVAILABLE:
      return 'Disponible';
    case SeatStatus.RESERVED:
      return 'Reservado';
    case SeatStatus.OCCUPIED:
      return 'Ocupado';
    default:
      return 'Desconocido';
  }
}
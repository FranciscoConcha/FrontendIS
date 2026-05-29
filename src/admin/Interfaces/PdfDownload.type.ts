export interface ReservationSeatDto {
  id: number;
  seatNumber: string;
  section: string;
  price: number;
}
 
export interface MyReservationDto {
  id: number;
  reservationCode: string;
  funtionTitle: string;
  dateFunction: string;
  timeFunction: string;
  seatCount: number;
  totalPrice: number;
  status: number;
  createdAt: string;
}
 
export interface MyReservationsResponse {
  success: boolean;
  message: string;
  data: MyReservationDto[];
}
 
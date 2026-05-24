export interface CreateReservation{
    FuntionId: number;
    SeatIds: number[];
}

export interface ReservationSeatDto{
    Id: number;
    SeatNumber: string;
    Section: string;
    Price: number;
}

export interface ReservationData{
    id: number;
    ReservationCode: string;
    FuntionId: number;
    FuntionTitle: string;
    SelectedSeats: ReservationSeatDto[];
    TotalPrice: number;
    Status:number;
    CreatedAt: Date;
}
export interface CreateReservationResponse{
    Success: boolean;
    Message: string;
    Data: ReservationData;
}

export interface SeatDto {
    id: number;
    seatNumber: string;
    section: string;
    price: number;
    status: number;  
}


export interface GetSeatsResponse {
    success: boolean;
    message: string;
    data: SeatDto[];
}

export interface FunctionDto {
    id: number;
    name: string;
    dateFunction: string;
    timeFunction: string;
    image: string;
}
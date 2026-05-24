export interface Booking{
    id?:number;
    userId?:number;
    movieId?:number;
    seatCount?:number;
    selectedSeats?: string;
    totalCost?:number;
}
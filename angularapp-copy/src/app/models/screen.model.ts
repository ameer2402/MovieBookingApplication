export interface ScreenConfig {
  id?: string;
  theatreId: string;
  name: string;
  type: string;
  capacity: number;
  grid: string; // JSON string of the 2D layout array
}

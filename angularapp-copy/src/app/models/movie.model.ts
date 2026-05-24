export interface Movie{
    id?:number;
    title:string;
    duration:number;
    genre:string;
    price:number;
    totalSeats?: number;
    showDate?: string;
    showTime?: string;
    rating?: number;
    ratingCount?: number;
    language?: string;
    selectedScreenId?: string;
    posterBase64?: string;
    categoryPrices?: any; // JSON object { standard, vip, platinum }
    blockedSeats?: string; // JSON string array or parsed array
    
    // UI Metadata (Resolved from Theatre/Screen relations)
    city?: string;
    theatreName?: string;
}
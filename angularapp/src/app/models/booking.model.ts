export interface Booking {
    BookingId: number;
    UserId: number;
    ConferenceEventId: number;
    BookingStatus: string;
    BookingDate: Date;
    Gender: string;
    Age: number;
    Occupation: string;
    City: string;
    Proof: string;
    AdditionalNotes?: string;
}
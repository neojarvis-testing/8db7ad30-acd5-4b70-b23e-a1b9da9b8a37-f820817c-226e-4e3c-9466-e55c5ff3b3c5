import { ConferenceEvent } from "./conference-event.model";
import { User } from "./user.model";

export interface Booking {
    bookingId: number;
    userId: number;
    conferenceEventId: number;
    bookingStatus: string;
    bookingDate: Date;
    gender: string;
    age: number;
    occupation: string;
    city: string;
    proof: string;
    additionalNotes?: string;
    user: User;
    conferenceEvent: ConferenceEvent;
}
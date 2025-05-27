export interface ConferenceEvent {
    conferenceEventId?: number;
    eventName: string;
    organizerName: string;
    category: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    capacity: number;
}


export type EventStatus = 'DRAFT' | 'LIVE' | 'COMPLETED';


export type TEvent = {
    id: string | number;
    title: string;
    start_date: string;
    end_date: string;
    created_at?: string;
    updated_at?: string;
    location?: string | null;
    status: string;
    // Add any other properties your Event model has
};

export type TEventCreate = {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    location?: string | null;
};

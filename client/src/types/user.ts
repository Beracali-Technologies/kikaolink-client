import { ID } from './common';

// User & Auth types
export interface TUser {
    id: ID;
    name: string;
    email: string;
}

export type TLoginCredentials = {
    email?: string;
    password?: string;
};


export interface Attendee {
    id: ID;
    name: string;
    email: string;
    table?: string;
    seat?: number;
    ticketType?: string;
    isCheckedIn: boolean;
}

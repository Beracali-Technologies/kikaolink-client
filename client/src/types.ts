// --- EVENT TYPES ---

export interface TEvent {
  id: number | string;
  title: string;
  start_date: string;
  end_date: string;
  status: 'DRAFT' | 'LIVE' | 'COMPLETED';
  // Add any other properties your event model has
}

// Type for creating a new event (id and status are handled by backend)
export type TEventCreate = {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
};


// --- USER & AUTH TYPES ---

export interface TUser {
    id: number;
    name: string;
    email: string;
}

export type TLoginCredentials = {
    email?: string;
    password?: string;
};


// --- REGISTRATION FORM EDITOR TYPES (Your existing code was perfect) ---

export type FieldType =
    | 'text'
    | 'textarea'
    | 'multichoice'
    | 'checkbox'
    | 'country'
    | 'date'
    | 'paragraph'
    | 'header';

export interface Field {
    id: number;
    label: string;
    fieldType: FieldType;
    required: boolean;
    systemName?: string;
    editable: boolean;
    deletable: boolean;
    isFixed?: boolean;

    options?: string[];
    helpText?: string;
}

export interface Attendee {
    id: string;
    name: string;
    email: string;
    table: string;
    seat: number;
    ticketType: string;
    isCheckedIn: boolean;
}

// Registration form editor types
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

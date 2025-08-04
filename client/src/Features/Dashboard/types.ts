// types.ts

// Defines the possible types of fields a user can add.
export type FieldType =
    | 'text'          // Single line text
    | 'textarea'      // Multi-line text
    | 'multichoice'   // Radio buttons (select one)
    | 'checkbox'      // Checkboxes (select many)
    | 'country'       // A dropdown list of countries
    | 'date'          // A date picker
    | 'paragraph'     // A block of text for display only, not input
    | 'header';       // A section header, e.g., "Contact Information"

// This is our main, upgraded Field interface.
export interface Field {
    id: number;
    label: string;
    fieldType: FieldType;
    required: boolean;
    systemName?: string; // for first and email
    // --- Flags for the editor UI ---
    editable: boolean;   // Can the label be changed?
    deletable: boolean;  // Can the field be removed?
    isFixed?: boolean;   // Can the field be moved? (e.g., Email)
    // --- Data for specific field types ---
    options?: string[]; // Used for multichoice, checkbox fields
    helpText?: string;
}

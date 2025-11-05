// src/types/forms/registrationForm.ts
export type FieldType =
  | 'text' | 'string'
  | 'textarea'
  | 'multichoice'
  | 'checkbox'
  | 'country' | 'email'
  | 'date'
  | 'paragraph'
  | 'header'
  | 'select';

export interface Field {
  id: number | string;
  label: string;
  fieldType: FieldType;
  required: boolean;
  systemName?: string;
  editable: boolean;
  deletable: boolean;
  isFixed?: boolean;
  options?: any[];
  helpText?: string;
}

export interface RegistrationField {
  id: number;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

export interface RegistrationFormData {
  [key: string]: string | boolean;
}

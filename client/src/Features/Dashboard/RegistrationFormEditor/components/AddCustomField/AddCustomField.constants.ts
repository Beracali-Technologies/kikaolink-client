import { FieldType } from '@/types';

export const fieldOptions: { label: string; type: FieldType }[] = [
  { label: 'Single Line Text', type: 'text' },
  { label: 'Multi Line Text', type: 'textarea' },
  { label: 'Multiple Choice', type: 'multichoice' },
  { label: 'Checkboxes', type: 'checkbox' },
  { label: 'Country List', type: 'country' },
  { label: 'Date', type: 'date' },
  { label: 'Paragraph', type: 'paragraph' },
  { label: 'Section Header', type: 'header' },
];

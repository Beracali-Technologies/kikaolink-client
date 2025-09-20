import { TEventCreate } from '../events/base';

export interface EventFormProps {
  event?: TEventCreate | null;
  onFormSubmit?: (data: TEventCreate) => void;
  isSubmitting?: boolean;
  mode: 'create' | 'edit';
}

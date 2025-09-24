import { Field } from '@/types';

export interface StandardFieldsPanelProps {
  allStandardFields: Field[];
  activeFields: Field[];
  onToggle: (systemName: string, isChecked: boolean) => void;
}

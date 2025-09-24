import { Field } from '@/types';

export interface FormFieldItemProps {
  field: Field;
  index: number;
  isEditing: boolean;
  isFirst: boolean;
  isLast: boolean;
  onUpdate: (field: Field) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number | null) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (targetIndex: number) => void;
  onDragEnd: () => void;
}

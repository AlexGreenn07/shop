import { profileStyles } from '@/app/(auth)/styles';
import { Edit } from 'lucide-react';

function EditButton({ onEdit }: { onEdit: () => void }) {
  return (
    <button onClick={onEdit} className={profileStyles.editButton}>
      <Edit className="mr-1 h-4 w-4" />
      Редактировать
    </button>
  );
}

export default EditButton;

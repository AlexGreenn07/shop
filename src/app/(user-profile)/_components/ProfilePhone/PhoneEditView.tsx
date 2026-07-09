import { profileStyles } from '@/app/(auth)/styles';

interface PhoneEditViewProps {
  onCancel: () => void;
  onSave?: () => void;
  isSaving: boolean;
  isSendingOTP: boolean;
  isVerificationMode?: boolean;
}

function PhoneEditView({
  onCancel,
  onSave,
  isSaving,
  isSendingOTP,
  isVerificationMode,
}: PhoneEditViewProps) {
  return (
    <div className="flex w-full gap-2 md:w-auto">
      <button
        onClick={onCancel}
        className={profileStyles.cancelButton}
      >
        Отмена
      </button>
      {!isVerificationMode && onSave && (
        <button
          onClick={onSave}
          className={profileStyles.saveButton}
          disabled={isSaving || isSendingOTP}
        >
          {isSaving
            ? 'Сохранение...'
            : isSendingOTP
              ? 'Отправка кода'
              : 'Сохранить'}
        </button>
      )}
    </div>
  );
}

export default PhoneEditView;

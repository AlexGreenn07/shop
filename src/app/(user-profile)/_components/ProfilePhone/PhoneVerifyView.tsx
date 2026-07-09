import { formStyles, profileStyles } from '@/app/(auth)/styles';

interface PhoneVerifyViewProps {
  currentPhone: string;
  code: string;
  isSaving: boolean;
  onCodeChange: (value: string) => void;
  onVerify: () => void;
  canResend: boolean;
  timeLeft: number;
  onResendCode: () => void;
}

const PhoneVerifyView = ({
  currentPhone,
  code,
  isSaving,
  onCodeChange,
  onVerify,
  canResend,
  timeLeft,
  onResendCode,
}: PhoneVerifyViewProps) => {
  return (
    <div className="mt-4 rounded bg-green-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-primary text-sm font-medium">
          Код подтверждения отправлен на +{currentPhone}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-center gap-3">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className={`${formStyles.input} block text-center [&&]:w-27.5 [&&]:bg-white`}
            autoComplete="one-time-code"
          />

          <button
            onClick={onVerify}
            disabled={code.length !== 6 || isSaving}
            className={`${profileStyles.saveButton} bg-primary rounded px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500 [&&]:h-10`}
          >
            {isSaving ? 'Проверка...' : 'Подтвердить'}
          </button>
        </div>
        <button
          onClick={onResendCode}
          disabled={!canResend}
          className={`rounded px-4 py-2 transition-colors ${
            canResend
              ? profileStyles.saveButton
              : profileStyles.cancelButton
          }`}
        >
          {canResend
            ? 'Отправить снова...'
            : `Повторить отправку через ${timeLeft} сек`}
        </button>
      </div>
    </div>
  );
};

export default PhoneVerifyView;

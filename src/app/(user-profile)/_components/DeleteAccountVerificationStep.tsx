import { Loader2, Check, Trash2 } from 'lucide-react';
import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout';
import { formStyles } from '@/app/(auth)/styles';

interface DeleteAccountVerificationStepProps {
  phoneNumber?: string;
  code: string;
  error: string;
  verifying: boolean;
  canResend: boolean;
  timeLeft: number;
  onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerify: (e: React.FormEvent) => void;
  onResend: () => void;
}

export const DeleteAccountVerificationStep = ({
  phoneNumber,
  code,
  error,
  verifying,
  canResend,
  timeLeft,
  onCodeChange,
  onVerify,
  onResend,
}: DeleteAccountVerificationStepProps) => {
  return (
    <AuthFormLayout>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col items-center">
          <Trash2 className="mb-4 h-12 w-12 text-red-500" />
          <h1 className="text-center text-2xl font-bold">
            Последнее подтверждение
          </h1>
        </div>

        <p className="text-center font-medium text-red-600">
          Вы собираетесь безвозвратно удалить свой аккаунт и все
          данные!
        </p>

        <p className="text-center">
          Введите код из SMS, отправленный на номер +{phoneNumber}
        </p>

        {error && (
          <div className="rounded bg-[#ffc7c7] p-3 text-center text-[#d80000]">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-row justify-center gap-3">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={code}
              onChange={onCodeChange}
              className={`${formStyles.input} block text-center [&&]:w-27.5 [&&]:bg-white`}
              autoComplete="one-time-code"
              autoFocus
              required
            />

            <button
              onClick={onVerify}
              disabled={code.length !== 6 || verifying}
              className="flex h-10 flex-1 cursor-pointer flex-row items-center justify-center gap-x-3 rounded bg-[#ffc7c7] px-4 py-2 text-center font-medium text-[#d80000] duration-300 hover:bg-[#d80000] hover:text-[#f2f2f2] disabled:bg-[#fcd5ba]"
            >
              {verifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Удаление...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 shrink-0" />
                  Удалить аккаунт
                </>
              )}
            </button>
          </div>

          <button
            onClick={onResend}
            disabled={!canResend}
            className="cursor-pointer text-sm text-[#414141] underline duration-300 hover:text-black disabled:opacity-50"
          >
            {canResend
              ? 'Отправить код повторно'
              : `Повторить отправку через: ${timeLeft} сек`}
          </button>
        </div>
      </div>
    </AuthFormLayout>
  );
};

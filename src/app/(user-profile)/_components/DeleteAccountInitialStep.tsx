import { Loader2, Trash2, Mail } from 'lucide-react';
import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout';

interface DeleteAccountInitialStepProps {
  loading: boolean;
  error: string;
  canResend: boolean;
  timeLeft: number;
  onSendCode: (e: React.FormEvent) => void;
}

export const DeleteAccountInitialStep = ({
  loading,
  error,
  canResend,
  timeLeft,
  onSendCode,
}: DeleteAccountInitialStepProps) => {
  return (
    <AuthFormLayout>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col items-center">
          <Trash2 className="mb-4 h-12 w-12 text-red-500" />
          <h1 className="text-center text-2xl font-bold">
            Удаление аккаунта
          </h1>
        </div>
        <p className="text-center font-medium text-red-600">
          Внимание! Это действие необратимо. Все Ваши данные будут
          удалены без возможности восстановления.
        </p>

        <p className="text-center">
          Для подтверждения удаления аккаунта мы отправим SMS с кодом
          на телефон, по которому Вы регистрировались.
        </p>

        {error && (
          <div className="rounded bg-[#ffc7c7] p-3 text-center text-[#d80000]">
            {error}
          </div>
        )}

        <form
          onSubmit={onSendCode}
          className="mx-auto flex flex-col justify-center"
          autoComplete="off"
        >
          <button
            type="submit"
            disabled={loading || !canResend}
            className="flex h-10 flex-1 cursor-pointer flex-row items-center justify-center gap-x-3 rounded bg-[#ffc7c7] px-4 py-2 text-center font-medium text-[#d80000] duration-300 hover:bg-[#d80000] hover:text-[#f2f2f2] disabled:bg-[#fcd5ba]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : !canResend ? (
              `Ждите ${timeLeft} сек`
            ) : (
              <>
                <Mail className="h-4 w-4 shrink-0" />
                Получить код подтверждения
              </>
            )}
          </button>
        </form>
      </div>
    </AuthFormLayout>
  );
};

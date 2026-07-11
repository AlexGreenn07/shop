'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { AuthFormLayout } from '../_components/AuthFormLayout';
import { Loader2, Trash2, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

const VerifyDeleteEmailPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await authClient.deleteUser({
        callbackURL: '/goodbye',
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);

      router.replace('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Произошла ошибка'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthFormLayout>
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">
            Проверьте Вашу почту
          </h1>
          <p>
            Мы отправили письмо с подтверждением удаления аккаунта.
          </p>
        </div>
      </AuthFormLayout>
    );
  }

  return (
    <AuthFormLayout>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col items-center">
          <Trash2 className="mb-4 h-12 w-12 text-red-500" />
          <h1 className="text-center text-2xl font-bold">
            Удаление аккаунта
          </h1>
        </div>
        <p className="text-center">
          Для подтверждения удаления аккаунта мы отправим письмо с
          инструкциями на Вашу почту, по которой Вы регистрировались.
        </p>
        {error && (
          <div className="rounded bg-[#ffc7c7] p-5 text-[#d80000]">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex flex-col justify-center"
          autoComplete="off"
        >
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 flex-1 cursor-pointer flex-row items-center justify-center gap-x-3 rounded bg-[#ffc7c7] px-4 py-2 text-center font-medium text-[#d80000] duration-300 hover:bg-[#d80000] hover:text-[#f2f2f2] disabled:bg-[#fcd5ba]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 shrink-0" />
                Отправить подтверждение
              </>
            )}
          </button>
        </form>
      </div>
    </AuthFormLayout>
  );
};

export default VerifyDeleteEmailPage;

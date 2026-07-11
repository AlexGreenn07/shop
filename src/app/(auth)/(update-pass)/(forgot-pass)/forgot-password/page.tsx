'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { AuthFormLayout } from '../../../_components/AuthFormLayout';
import { buttonStyles, formStyles } from '../../../styles';
import { Loader2, Mail, KeyRound } from 'lucide-react';
import SuccessSentEmail from '../../_components/SuccessSentEmail';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/email-pass-reset`,
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Произошла ошибка'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <SuccessSentEmail email={email} />;
  }

  return (
    <AuthFormLayout>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col items-center">
          <KeyRound className="mb-4 h-12 w-12 text-(--color-primary)" />
          <h1 className="text-center text-2xl font-bold">
            Сброс пароля
          </h1>
        </div>
        <p>
          Введите email, по которому проходила регистрация, и мы
          вышлем Вам инструкции по сбросу пароля.
        </p>
        {error && (
          <div className="rounded bg-red-100 p-5 text-red-600">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex flex-col justify-center"
          autoComplete="off"
        >
          <div>
            <label
              htmlFor="email"
              className={`${formStyles.label} text-left`}
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={formStyles.input}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${buttonStyles.active} flex cursor-pointer items-center justify-center gap-2 rounded [&&]:mt-8 [&&]:h-10 [&&]:w-full`}
            style={loading ? { backgroundColor: '#fcd5ba' } : {}}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                Отправить инструкции
              </>
            )}
          </button>
        </form>
      </div>
    </AuthFormLayout>
  );
};

export default ForgotPassword;

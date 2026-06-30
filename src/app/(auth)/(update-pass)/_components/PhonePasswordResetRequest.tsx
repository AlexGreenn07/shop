'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { AuthFormLayout } from '../../_components/AuthFormLayout';
import { buttonStyles, formStyles } from '../../styles';
import { Loader2, Phone, KeyRound } from 'lucide-react';
import { InputMask } from '@react-input/mask';

interface PhonePasswordResetRequestProps {
  onSuccessAction: (phone: string) => void;
  loading: boolean;
  setLoadingAction: (loading: boolean) => void;
  error: string | null;
  setErrorAction: (error: string | null) => void;
}

export const PhonePasswordResetRequest = ({
  onSuccessAction,
  loading,
  setLoadingAction,
  error,
  setErrorAction,
}: PhonePasswordResetRequestProps) => {
  const [phone, setPhone] = useState('');

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAction(true);
    setErrorAction(null);

    try {
      const { data, error: resetError } =
        await authClient.phoneNumber.requestPasswordReset({
          phoneNumber: phone.replace(/\D/g, ''),
        });
      console.log(data);
      if (resetError) {
        if (
          resetError.message
            ?.toLowerCase()
            .includes("isn't registered")
        ) {
          throw new Error(
            'Номер телефона не зарегистрирован в системе'
          );
        }
        throw new Error(
          resetError.message || 'Не удалось отправить код'
        );
      }

      onSuccessAction(phone);
    } catch (err) {
      setErrorAction(
        err instanceof Error ? err.message : 'Произошла ошибка'
      );
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <AuthFormLayout>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col items-center">
          <KeyRound className="mb-4 h-12 w-12 text-(--color-primary)" />
          <h1 className="text-center text-2xl font-bold">
            Сброс пароля для телефона
          </h1>
        </div>

        <p className="text-center">
          Введите номер телефона, на который придет код для сброса
          пароля
        </p>

        {error && (
          <div className="rounded bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleRequestReset}
          className="mx-auto flex flex-col gap-y-4"
        >
          <div>
            <label htmlFor="phone" className={formStyles.label}>
              Номер телефона
            </label>

            <InputMask
              mask="+7 (___) ___-__-__"
              replacement={{ _: /\d/ }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className={formStyles.input}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${buttonStyles.active} flex cursor-pointer items-center justify-center gap-2 rounded [&&]:h-10 [&&]:w-full`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Phone className="h-4 w-4" />
                Отправить код
              </>
            )}
          </button>
        </form>
      </div>
    </AuthFormLayout>
  );
};

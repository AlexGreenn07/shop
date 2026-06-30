'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { AuthFormLayout } from '../../_components/AuthFormLayout';
import { buttonStyles } from '../../styles';
import { Loader2, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PasswordInput from '../../_components/PasswordInput';
import SuccessUpdatePass from './SuccessUpdatePass';
import { isPasswordValid } from '@/utils/validation/passwordValid';

interface PhonePasswordResetVerifyProps {
  phone: string;
  loading: boolean;
  setLoadingAction: (loading: boolean) => void;
  error: string | null;
  setErrorAction: (error: string | null) => void;
  onBackAction: () => void;
}

export const PhonePasswordResetVerify = ({
  phone,
  loading,
  setLoadingAction,
  error,
  setErrorAction,
  onBackAction,
}: PhonePasswordResetVerifyProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [closeForm, setCloseForm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(e.target.value);
    setErrorAction(null);
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtp(e.target.value);
    setErrorAction(null);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAction(true);
    setErrorAction(null);

    try {
      // 1. Сначала проверяем OTP через BetterAuth
      const { error: resetError } =
        await authClient.phoneNumber.resetPassword({
          phoneNumber: phone.replace(/\D/g, ''),
          otp,
          newPassword,
        });
      if (resetError) {
        if (resetError.message?.includes('Invalid OTP')) {
          setOtp('');
          throw new Error('Неверный код подтверждения');
        } else if (
          resetError.message?.includes('Too many attempts')
        ) {
          setCloseForm(true);
          throw new Error(
            'Превышено количество попыток. Перейдите на страницу входа, чтобы начать заново, или измените номер телефона'
          );
        } else if (
          resetError.message?.includes('OTP expired') ||
          resetError.message?.includes('OTP not found')
        ) {
          setCloseForm(true);
          throw new Error(
            'Просроченный или недействительный код подтверждения. Перейдите на страницу входа, чтобы начать заново, или измените номер телефона'
          );
        }
        throw new Error(resetError.message || 'Неверный OTP код');
      }

      // 2. Если OTP верный, обновляем пароль в нашей БД
      const response = await fetch('/api/auth/reset-phone-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phone.replace(/\D/g, ''),
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Не удалось обновить пароль в системе'
        );
      }

      setSuccess(true);

      setTimeout(() => {
        router.replace('/login');
      }, 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Произошла ошибка';
      setErrorAction(errorMessage);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleToLogin = () => {
    router.push('/login');
  };

  if (success) {
    return <SuccessUpdatePass />;
  }

  return (
    <AuthFormLayout>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col items-center">
          <MessageCircle className="text-primary mb-4 h-12 w-12" />
          <h1 className="text-center text-2xl font-bold">
            Введите код из SMS
          </h1>
        </div>

        <p className="text-center">
          Мы отправили 6-значный код на номер: <br />
          <span className="font-medium text-[#ff6633]">{phone}</span>
        </p>

        {error && (
          <div className="rounded bg-red-100 p-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}
        {error &&
          (error.includes('Превышено количество попыток') ||
            error.includes(
              'Просроченный или недействительный код'
            )) && (
            <button
              onClick={handleToLogin}
              className="text-primary mx-auto cursor-pointer text-sm hover:underline"
            >
              Перейти на страницу входа
            </button>
          )}
        <button
          type="button"
          onClick={onBackAction}
          className="mx-auto cursor-pointer text-sm text-(--color-primary) hover:underline"
        >
          Изменить номер телефона
        </button>
        {!closeForm && (
          <form
            onSubmit={handleResetPassword}
            className="flex flex-col justify-center gap-y-4"
          >
            <div>
              <p className="text-center text-[#8f8f8f]">Код из SMS</p>
              <input
                type="password"
                id="otp"
                pattern="[0-9]{6}"
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp}
                onChange={handleOtpChange}
                className="focus:border-primary mx-auto flex h-15 w-27.5 justify-center rounded border border-[#bfbfbf] px-4 py-3 text-center focus:bg-white focus:shadow-(--shadow-button-default) focus:outline-none"
                required
              />
            </div>

            <div className="relative flex w-full flex-row flex-wrap justify-center gap-x-8 gap-y-4">
              <div className="relative flex flex-col items-start">
                <PasswordInput
                  id="password"
                  label="Новый пароль"
                  value={newPassword}
                  onChangeAction={handlePasswordChange}
                  showPassword={showNewPassword}
                  togglePasswordVisibilityAction={() =>
                    setShowNewPassword(!showNewPassword)
                  }
                  showRequirements={true}
                  inputClass={`h-15 ${
                    newPassword.length > 0 &&
                    !isPasswordValid(newPassword)
                      ? 'border-red-500'
                      : ''
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={loading}
                className={`${buttonStyles.active} mx-auto flex w-full max-w-65 cursor-pointer items-center justify-center gap-2 rounded px-4 [&&]:h-10`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  'Установить новый пароль'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </AuthFormLayout>
  );
};

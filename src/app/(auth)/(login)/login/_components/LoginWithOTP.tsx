'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CONFIG } from '../../../../../../config/config';
import useTimer from '@/hooks/useTimer';
import { authClient } from '@/lib/auth-client';
import { buttonStyles } from '../../../styles';
import Link from 'next/link';
import Image from 'next/image';
import { AuthFormLayout } from '../../../_components/AuthFormLayout';
import { LoadingContent } from '@/app/(auth)/(reg)/_components/LoadingContent';
import { useAuthStore } from '@/store/authStore';
import OTPResendButton from '@/app/(auth)/_components/OTPResendButton';

function LoginWithOTP({ phoneNumber }: { phoneNumber: string }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(
    CONFIG.MAX_AUTH_ATTEMPTS
  );
  const router = useRouter();
  const { timeLeft, canResend, startTimer } = useTimer(
    CONFIG.TIMEOUT_SENDING_CODE_PERIOD
  );
  const { login } = useAuthStore();

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    setIsLoading(true);
    try {
      const { error: verifyError } =
        await authClient.phoneNumber.verify({
          phoneNumber,
          code,
          disableSession: false,
        });
      if (verifyError) throw verifyError;
      setAttemptsLeft(CONFIG.MAX_AUTH_ATTEMPTS);
      const response = await fetch('/api/auth/check-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Данные пользователя не получены');
      }
      const userData = await response.json();
      login(userData.userName);

      router.replace('/');
    } catch (error) {
      console.error('Ошибка верификации телефона', error);
      setCode('');
      setAttemptsLeft((prev) => prev - 1);

      if (attemptsLeft <= 1) {
        setError(
          'Попытки исчерпаны. Пожалуйста, зарегистрируйтесь снова'
        );
        setTimeout(() => router.replace('/register'), 2000);
      } else {
        setError(
          `Неверный код. Осталось попыток: ${attemptsLeft - 1}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    try {
      await authClient.phoneNumber.sendOtp(
        {
          phoneNumber,
        },
        {
          onSuccess: () => {
            startTimer();
            setError('');
            setAttemptsLeft(CONFIG.MAX_AUTH_ATTEMPTS);
          },
          onError: (ctx) => {
            setError(
              ctx.error?.message ||
                'Неизвестная ошибка при отправке СМС.'
            );
          },
        }
      );
    } catch (error) {
      console.error('Неизвестная ошибка при отправке СМС', error);
      setError('Неизвестная ошибка при отправке СМС');
    }
  };
  if (isLoading) {
    return (
      <AuthFormLayout>
        <LoadingContent title={'Проверяем код...'} />
      </AuthFormLayout>
    );
  }
  return (
    <AuthFormLayout>
      <div className="flex flex-col gap-y-8">
        <h1 className="text-center text-2xl font-bold text-[#414141]">
          Вход
        </h1>
        <div>
          <p className="text-center text-[#8f8f8f]">Код из СМС</p>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="mx-auto flex max-h-screen w-65 flex-col items-center justify-center"
          >
            <input
              type="password"
              placeholder="Введите код"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              autoComplete="one-time-code"
              required
              className="focus:border-primary flex h-15 w-27.5 justify-center rounded border border-[#bfbfbf] px-4 py-3 text-center text-2xl focus:bg-white focus:shadow-(--shadow-button-default) focus:outline-none"
            />
            {error && (
              <div className="mt-2 text-center text-sm text-red-500">
                {error}
              </div>
            )}
            <button
              type="submit"
              className={`${buttonStyles.base} ${code.length === 6 ? buttonStyles.active : buttonStyles.inactive} mb-0 [&&]:mt-8`}
              disabled={code.length !== 6 || attemptsLeft <= 0}
            >
              Отправить
            </button>
          </form>
        </div>
        <OTPResendButton
          canResend={canResend}
          timeLeft={timeLeft}
          onResendAction={handleResend}
        />
        <Link
          href="/login"
          className="mx-auto flex h-8 w-30 cursor-pointer items-center justify-center gap-x-2 text-xs text-[#414141] duration-300 hover:text-black"
        >
          <Image
            src="/icons-auth/icon-arrow-left.svg"
            width={24}
            height={24}
            alt="Вернуться"
          />
          Вернуться
        </Link>
      </div>
    </AuthFormLayout>
  );
}

export default LoginWithOTP;

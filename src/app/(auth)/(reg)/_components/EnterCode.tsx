'use client';

import { useEffect, useState } from 'react';
import { buttonStyles } from '../../styles';
import { CONFIG } from '../../../../../config/config';
import { useRegFormContext } from '@/app/contexts/RegFormContext';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import useTimer from '@/hooks/useTimer';
import { AuthFormLayout } from '../../_components/AuthFormLayout';
import { LoadingContent } from './LoadingContent';
import OTPResendButton from '../../_components/OTPResendButton';

function EnterCode({ phoneNumber }: { phoneNumber: string }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(
    CONFIG.MAX_AUTH_ATTEMPTS
  );
  const router = useRouter();
  const { regFormData } = useRegFormContext();
  const { timeLeft, canResend, startTimer } = useTimer(
    CONFIG.TIMEOUT_SENDING_CODE_PERIOD
  );

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    setIsLoading(true);
    try {
      const {
        phoneNumber,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        password,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        confirmPassword,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        email,
        ...dataForVerify
      } = regFormData;
      const { data: verifyData, error: verifyError } =
        await authClient.phoneNumber.verify({
          phoneNumber,
          code,
          disableSession: false,
          ...dataForVerify,
        });
      if (verifyError) throw verifyError;
      setAttemptsLeft(CONFIG.MAX_AUTH_ATTEMPTS);

      const passwordResponse = await fetch('/api/auth/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: verifyData.user.id,
          password: regFormData.password,
        }),
      });

      if (!passwordResponse.ok) {
        const errorData = await passwordResponse.json();
        console.error('Детали ошибки', errorData);
        throw new Error(errorData.error || 'Ошибка установки пароля');
      }
      const { error: updateError } =
        await authClient.updateUser(dataForVerify);
      if (updateError) throw updateError;
      router.replace('/login');
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
    <>
      <div className="flex flex-col gap-y-8">
        <h1 className="text-center text-2xl font-bold text-[#414141]">
          Регистрация
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
          href="/register"
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
    </>
  );
}

export default EnterCode;

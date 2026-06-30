'use client';

import { LoadingContent } from '@/app/(auth)/(reg)/_components/LoadingContent';
import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout';
import PasswordInput from '@/app/(auth)/_components/PasswordInput';
import Tooltip from '@/app/(auth)/_components/Tooltip';
import { buttonStyles } from '@/app/(auth)/styles';
import { authClient } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

const EnterPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <AuthFormLayout>
          <LoadingContent title={'Сейчас запросим пароль'} />
        </AuthFormLayout>
      }
    >
      <EnterPasswordContent />
    </Suspense>
  );
};

function EnterPasswordContent() {
  const searchParams = useSearchParams();
  const loginParams = searchParams.get('login') || '';
  const loginType = searchParams.get('loginType') || '';
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuthStore();
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message.includes('Неверный пароль') ||
        error.message.includes('Invalid email or password')
        ? 'Неверный пароль'
        : error.message;
    }
    return 'Произошла непредвиденная ошибка';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };
  const handleForgotPassword = () => {
    if (loginType === 'phone') {
      router.replace(`/phone-pass-reset`);
    } else {
      router.replace('/forgot-password');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (loginType === 'phone') {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber: loginParams,
            password,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Ошибка при входе');
        }

        const userName = data.user?.name;
        login(userName);
        router.replace('/');
      } else {
        await authClient.signIn.email(
          {
            email: loginParams,
            password,
          },
          {
            onSuccess: (ctx) => {
              const userName = ctx.data?.user.name || 'Пользователь';
              login(userName);
              router.replace('/');
            },
            onError: (ctx) => {
              setError(ctx.error?.message || 'Ошибка при входе');
            },
          }
        );
        router.replace('/');
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <AuthFormLayout>
        <LoadingContent title={'Происходит авторизация'} />
      </AuthFormLayout>
    );
  }

  return (
    <AuthFormLayout>
      <h1 className="mb-8 text-center text-2xl font-bold text-[#414141]">
        Вход
      </h1>
      <form
        action=""
        onSubmit={handleSubmit}
        autoComplete="off"
        className="mx-auto flex max-h-screen w-65 flex-col justify-center gap-y-8"
      >
        <div className="relative flex w-full flex-row flex-wrap justify-center gap-x-8 gap-y-4">
          <div className="flex w-full flex-col items-start gap-y-4">
            <PasswordInput
              id="password"
              label="Пароль"
              value={password}
              onChangeAction={handleChange}
              showPassword={showPassword}
              togglePasswordVisibilityAction={() =>
                setShowPassword(!showPassword)
              }
              inputClass="h-16"
            />
            {error && <Tooltip text={error} position="top" />}
          </div>
        </div>
        <button
          type="submit"
          disabled={!password || isLoading}
          className={` ${buttonStyles.base} my-8 [&&]:my-0 ${!password || isLoading ? buttonStyles.inactive : buttonStyles.active} `}
        >
          Подтвердить
        </button>
        <div className="mx-auto flex flex-row flex-wrap justify-center text-xs">
          <button
            onClick={() => router.replace('/login')}
            type="button"
            className="mx-auto flex h-8 w-30 cursor-pointer items-center justify-center gap-x-2 text-xs text-[#414141] duration-300 hover:text-black"
          >
            <Image
              src="/icons-auth/icon-arrow-left.svg"
              width={24}
              height={24}
              alt="Вернуться"
            />
            Вернуться
          </button>
          <button
            onClick={handleForgotPassword}
            className="flex h-8 w-30 items-center justify-center text-[#414141] duration-300 hover:text-black"
          >
            Забыли пароль?
          </button>
        </div>
      </form>
    </AuthFormLayout>
  );
}

export default EnterPasswordPage;

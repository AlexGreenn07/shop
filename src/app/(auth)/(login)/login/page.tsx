'use client';

import { useState } from 'react';
import { AuthFormLayout } from '../../_components/AuthFormLayout';
import { InputMask } from '@react-input/mask';
import { buttonStyles, formStyles } from '../../styles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoadingContent } from '../../(reg)/_components/LoadingContent';
import { ErrorContent } from '../../(reg)/_components/ErrorContent';
import { MailWarning, PhoneOff } from 'lucide-react';
import { UnverifiedEmail } from './_components/UnverifiedEmail';
import { AuthMethodSelector } from './_components/AuthMethodSelector';

function EnterLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [login, setLogin] = useState('');
  const [showUnverifiedEmail, setShowUnverifiedEmail] =
    useState(false);
  const [showAuthMethodChoice, setShowAuthMethodChoice] =
    useState(false);
  const [loginType, setLoginType] = useState<'email' | 'phone'>(
    'email'
  );
  const router = useRouter();

  const switchToPhone = () => {
    setLogin('');
    setLoginType('phone');
  };
  const switchToEmail = () => {
    setLogin('');
    setLoginType('email');
  };
  const handleLoginChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setLogin(value);
    setError(null);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/check-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, loginType }),
      });
      const { exist, verified } = await response.json();
      if (!exist) {
        setError(
          loginType === 'email'
            ? 'Аккаунт с таким email не существует'
            : 'Аккаунт с таким телефоном не существует'
        );
        return;
      }
      if (!verified && loginType === 'email') {
        setShowUnverifiedEmail(true);
        return;
      }
      if (!verified && loginType === 'phone') {
        setError('Телефон не подтвержден, зайдите по email');
        return;
      }

      if (loginType === 'phone') {
        setShowAuthMethodChoice(true);
      } else {
        router.push(
          `/password-enter?login=${encodeURIComponent(login)}&loginType=${loginType}`
        );
      }
    } catch {
      setError('Ошибка при проверке данных');
    } finally {
      setIsLoading(false);
    }
  };
  const handleToRegister = () => router.replace('/register');
  const handleBackFromMethodChoice = () => {
    setLogin('');
    setLoginType('phone');
    setShowAuthMethodChoice(false);
  };
  const handleAuthMethodSelect = (method: 'password' | 'otp') => {
    const cleanLogin = login.replace(/\D/g, '');
    router.push(
      method === 'password'
        ? `/password-enter?login=${encodeURIComponent(cleanLogin)}&loginType=phone`
        : `/otp-enter?login=${encodeURIComponent(cleanLogin)}&loginType=phone`
    );
  };
  if (isLoading) {
    return (
      <AuthFormLayout>
        <LoadingContent
          title={
            <span>
              {`Проверка ${loginType === 'email' ? 'email' : 'телефона'}`}
              <br />
              {login}
            </span>
          }
        />
      </AuthFormLayout>
    );
  }

  if (error) {
    return (
      <AuthFormLayout>
        <ErrorContent
          error={error}
          icon={
            loginType === 'email' ? (
              <MailWarning className="h-8 w-8 text-red-600" />
            ) : (
              <PhoneOff className="h-8 w-8 text-red-600" />
            )
          }
          title="Упс!"
          secondaryAction={{
            label: 'Регистрация',
            onClick: handleToRegister,
          }}
        />
      </AuthFormLayout>
    );
  }
  if (showUnverifiedEmail) {
    return (
      <UnverifiedEmail
        email={login}
        setLoginAction={setLogin}
        setShowUnverifiedEmailAction={setShowUnverifiedEmail}
      />
    );
  }
  if (showAuthMethodChoice) {
    return (
      <AuthMethodSelector
        phoneNumber={login}
        onBackAction={handleBackFromMethodChoice}
        onMethodSelectAction={handleAuthMethodSelect}
      />
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
        className="mx-auto flex max-h-screen w-65 flex-col justify-center gap-y-8 overflow-y-auto"
      >
        <div className="relative flex w-full flex-row flex-wrap justify-center gap-x-8 gap-y-4">
          <div className="flex w-full flex-col items-start gap-y-4">
            <div>
              <label htmlFor="login" className={formStyles.label}>
                {loginType === 'email' ? 'Email' : 'Телефон'}
              </label>
              {loginType === 'phone' ? (
                <InputMask
                  mask="+7 (___) ___-__-__"
                  replacement={{ _: /\d/ }}
                  value={login}
                  placeholder="+7 (___) ___-__-__"
                  onChange={handleLoginChange}
                  className={formStyles.input}
                  required
                />
              ) : (
                <input
                  type="text"
                  value={login}
                  placeholder="example@mail.com"
                  onChange={handleLoginChange}
                  className={formStyles.input}
                  required
                />
              )}
            </div>
            <div className="mx-auto flex gap-2 text-sm">
              <button
                type="button"
                onClick={switchToEmail}
                className={`cursor-pointer rounded px-2 py-1 ${loginType === 'email' ? 'bg-[#ff6633] text-white' : 'bg-gray-100'} `}
              >
                По email
              </button>
              <button
                type="button"
                onClick={switchToPhone}
                className={`cursor-pointer rounded px-2 py-1 ${loginType === 'phone' ? 'bg-[#ff6633] text-white' : 'bg-gray-100'} `}
              >
                По телефону
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={
            (loginType === 'email' &&
              (!login.includes('@') || !login.includes('.'))) ||
            (loginType === 'phone' &&
              login.replace(/\D/g, '').length < 11) ||
            isLoading
          }
          className={` ${buttonStyles.base} [&&]:my-0 ${
            (loginType === 'email' &&
              (!login.includes('@') || !login.includes('.'))) ||
            (loginType === 'phone' &&
              login.replace(/\D/g, '').length < 11) ||
            isLoading
              ? 'cursor-not-allowed bg-[#fcd5ba] text-[#ff6633]'
              : 'bg-[#ff6633] text-white hover:shadow-(--shadow-article)'
          } duration-300 active:shadow-(--shadow-button-active)`}
        >
          Вход
        </button>
        <div className="mx-auto flex flex-row flex-wrap justify-center gap-4 text-xs">
          <Link
            href="/register"
            className={`${formStyles.loginLink} w-auto px-2`}
          >
            Регистрация
          </Link>
          <Link
            href="/forgot-password"
            className="flex h-8 w-30 items-center justify-center text-[#414141] duration-300 hover:text-black"
          >
            Забыли пароль?
          </Link>
        </div>
      </form>
    </AuthFormLayout>
  );
}
export default EnterLoginPage;

'use client';

import ErrorComponent from '@/components/ErrorComponent';
import { Loader } from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import PhoneInput from '../../PhoneInput';
import PasswordInput from '../../PasswordInput';
import { buttonStyles, formStyles } from '../../styles';
import Link from 'next/link';

const initialFormData = {
  phone: '+7',
  password: '',
};
function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setFormData(initialFormData);
    router.back();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone.replace(/\D/g, ''),
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Ошибка авторизации');
      }
      router.replace('/');
    } catch (error) {
      setError({
        error:
          error instanceof Error
            ? error
            : new Error('Неизвестная ошибка'),
        userMessage:
          (error instanceof Error && error.message) ||
          'Ошибка авторизации. Попробуйте снова',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorComponent
        error={error.error}
        userMessage={error.userMessage}
      />
    );

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#fcd5bacc] text-[#414141]">
      <div className="m-4 max-h-[90vh] w-full max-w-[420px] overflow-y-auto rounded bg-white shadow-(--shadow-auth-form)">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="m-2 cursor-pointer rounded bg-[#f3f2f1] p-1 duration-300"
            aria-label="Закрыть"
          >
            <Image
              src="/icons-auth/icon-closer.svg"
              alt="Закрыть окно аутентификации"
              width={24}
              height={24}
            />
          </button>
        </div>
        <h1 className="mb-10 text-center text-2xl font-bold">Вход</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          autoComplete="off"
          className="mx-auto flex w-full max-w-138 flex-col justify-center overflow-y-auto"
        >
          <div className="flex w-full flex-row flex-wrap justify-center gap-x-8 gap-y-4">
            <div className="flex flex-col items-start gap-y-4">
              <PhoneInput
                id="phone"
                label="Телефон"
                value={formData.phone}
                onChangeAction={handleChange}
              />

              <PasswordInput
                id="password"
                label="Пароль"
                value={formData.password}
                onChangeAction={handleChange}
                showPassword={showPassword}
                togglePasswordVisibilityAction={() =>
                  setShowPassword((prev) => !prev)
                }
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={
              !(formData.phone && formData.password) || isLoading
            }
            className={`${buttonStyles.base} ${
              formData.phone && formData.password
                ? buttonStyles.active
                : buttonStyles.inactive
            }`}
          >
            Вход
          </button>
          <div className="mx-auto mb-10 flex flex-row flex-wrap text-xs">
            <Link href="/register" className={formStyles.loginLink}>
              Регистрация
            </Link>
            <Link
              href="/forgotPassword"
              className="flex h-8 w-30 items-center justify-center text-[#414141] duration-300 hover:text-black"
            >
              Забыли пароль?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;

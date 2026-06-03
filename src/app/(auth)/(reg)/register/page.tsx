'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PhoneInput from '../PhoneInput';
import PersonUnput from '../PersonUnput';
import PasswordInput from '../PasswordInput';
import DateInput from '../DateInput';

const initialFormData = {
  phone: '+7',
  surname: '',
  firstName: '',
  password: '',
  confirmPassword: '',
  birthdayDate: '',
  region: '',
  location: '',
  gender: '',
  card: '',
  email: '',
  hasCard: false,
};

function RegisterPage() {
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

  const handleSubmit = () => {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="text-[#414141 fixed inset-0 z-100 flex min-h-screen items-center justify-center bg-[#fcd5bacc]">
      <div className="overflow-y-autorounded m-4 max-h-screen w-full max-w-171.75 bg-white shadow-(--shadow-auth-form)">
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
        <h1 className="font-bolt mb-10 text-center text-2xl">
          Регистрация
        </h1>
        <h2 className="font-bolt mb-6 text-center text-lg">
          Обязательные поля
        </h2>
        <form
          action=""
          onSubmit={handleSubmit}
          autoComplete="off"
          className="mx-auto flex max-h-screen w-full max-w-138 flex-col justify-center overflow-y-auto"
        >
          <div className="flex w-full flex-row flex-wrap justify-center gap-x-8 gap-y-4">
            <div className="flex flex-col items-start gap-y-4">
              <PhoneInput
                id="phone"
                label="Телефон"
                value={formData.phone}
                onChangeAction={handleChange}
              />
              <PersonUnput
                id="surname"
                label="Фамилия"
                value={formData.surname}
                onChangeAction={handleChange}
              />
              <PersonUnput
                id="firstName"
                label="Имя"
                value={formData.firstName}
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
                showRequirements={true}
              />
              <PasswordInput
                id="confirmPassword"
                label="Повторите пароль"
                value={formData.confirmPassword}
                onChangeAction={handleChange}
                showPassword={showPassword}
                togglePasswordVisibilityAction={() =>
                  setShowPassword((prev) => !prev)
                }
                compareWith={formData.password}
              />
            </div>
            <div className="flex flex-col items-start gap-y-4">
              <DateInput
                id="birthdayDate"
                label="Дата рождения"
                value={formData.birthdayDate}
                onChangeAction={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    ['birthdayDate']: value,
                  }))
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PhoneInput from '../PhoneInput';
import PersonInput from '../PersonInput';
import PasswordInput from '../PasswordInput';
import DateInput from '../DateInput';
import SelectRegion from '../SelectRegion';
import SelectCity from '../SelectCity';
import GenderSelect from '../GenderSelect';
import CardInput from '../CardInput';
import CheckboxCard from '../CheckboxCard';
import EmailInput from '../EmailInput';
import RegFormFooter from '../RegFormFooter';
import { validateRegisterForm } from '@/utils/validation/form';
import { Loader } from '@/components/Loader';
import ErrorComponent from '@/components/ErrorComponent';
import SuccessModal from '../SuccessModal';

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
  const [invalidFormMessage, setInvalidFormMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setFormData(initialFormData);
    router.back();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, type } = e.target;
    const value =
      type === 'checkbox' ? e.target.checked : e.target.value;
    if (invalidFormMessage) setInvalidFormMessage('');
    if (id === 'hasCard' && value === true) {
      setFormData((prev) => ({ ...prev, [id]: value, card: '' }));
      return;
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setInvalidFormMessage('');

    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
      setInvalidFormMessage(
        validation.errorMessage || 'Заполните поля корректно'
      );
      setIsLoading(false);
      return;
    }
    try {
      const [day, month, year] = formData.birthdayDate.split('.');
      const formattedBirthdayDate = new Date(
        `${year}-${month}-${day}`
      );
      const userData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, ''),
        birthdayDate: formattedBirthdayDate,
      };
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Ошибка регистрации');
      }

      setIsSuccess(true);
    } catch (error) {
      setError({
        error:
          error instanceof Error
            ? error
            : new Error('Неизвестная ошибка'),
        userMessage: 'Ошибка регистрации. Попробуйте снова',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => validateRegisterForm(formData).isValid;

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorComponent
        error={error.error}
        userMessage={error.userMessage}
      />
    );

  if (isSuccess) return <SuccessModal />;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#fcd5bacc] text-[#414141]">
      <div className="m-4 max-h-[90vh] w-full max-w-171.75 overflow-y-auto rounded bg-white shadow-(--shadow-auth-form)">
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
              <PersonInput
                id="surname"
                label="Фамилия"
                value={formData.surname}
                onChangeAction={handleChange}
              />
              <PersonInput
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
              <SelectRegion
                id="region"
                label="Регион"
                value={formData.region}
                onChangeAction={handleChange}
              />
              <SelectCity
                id="location"
                label="Населенный пункт"
                value={formData.location}
                onChangeAction={handleChange}
              />
              <GenderSelect
                label="Пол"
                value={formData.gender}
                onChangeAction={(gender) =>
                  setFormData((prev) => ({ ...prev, gender }))
                }
              />
            </div>
          </div>
          <h2 className="mt-10 mb-6 text-center text-lg font-bold">
            Не обязательные поля
          </h2>
          <div className="flex w-full flex-row flex-wrap justify-center gap-x-8 gap-y-4">
            <div className="flex w-65 flex-col gap-y-4">
              <CardInput
                id="card"
                label="Номер карты лояльности"
                value={formData.card}
                onChangeAction={handleChange}
                disabled={formData.hasCard}
              />

              <CheckboxCard
                id="hasCard"
                checked={formData.hasCard}
                onChangeAction={handleChange}
              />
            </div>
            <EmailInput
              id="email"
              label="E-mail"
              value={formData.email}
              onChangeAction={handleChange}
            />
          </div>
          {invalidFormMessage && (
            <div className="my-4 rounded bg-red-50 p-4 text-center text-red-500">
              {invalidFormMessage}
            </div>
          )}
          <RegFormFooter
            isFormValid={isFormValid()}
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

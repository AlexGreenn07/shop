'use client';
import React, { useEffect, useState } from 'react';
import PhoneInput from '../../_components/PhoneInput';
import PersonInput from '../_components/PersonInput';
import PasswordInput from '../../_components/PasswordInput';
import DateInput from '../_components/DateInput';
import SelectRegion from '../_components/SelectRegion';
import SelectCity from '../_components/SelectCity';
import GenderSelect from '../_components/GenderSelect';
import CardInput from '../_components/CardInput';
import CheckboxCard from '../_components/CheckboxCard';
import EmailInput from '../_components/EmailInput';
import RegFormFooter from '../_components/RegFormFooter';
import { validateRegisterForm } from '@/utils/validation/form';
import { Loader } from '@/components/Loader';
import ErrorComponent from '@/components/ErrorComponent';
import { initialRegFormData } from '@/constants/regFormData';
import { RegFormData } from '@/types/regFormData';
import { AuthFormLayout } from '../../_components/AuthFormLayout';
import { useRegFormContext } from '@/app/contexts/RegFormContext';
import { useRouter } from 'next/navigation';
import VerificationMethodModal from '../_components/VerificationMethodModal';

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);
  const [registerForm, setRegisterForm] = useState<RegFormData>(
    initialRegFormData
  );
  const [showPassword, setShowPassword] = useState(false);
  const [invalidFormMessage, setInvalidFormMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { setRegFormData } = useRegFormContext();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && !registerForm.email) {
      router.replace('/verify/verify-phone');
    }
  }, [isSuccess, registerForm.email, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, type } = e.target;
    const value =
      type === 'checkbox' ? e.target.checked : e.target.value;
    if (invalidFormMessage) setInvalidFormMessage('');
    if (id === 'hasCard' && value === true) {
      setRegisterForm((prev) => ({ ...prev, [id]: value, card: '' }));
      return;
    }
    setRegisterForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setInvalidFormMessage('');

    const validation = validateRegisterForm(registerForm);
    if (!validation.isValid) {
      setInvalidFormMessage(
        validation.errorMessage || 'Заполните поля корректно'
      );
      setIsLoading(false);
      return;
    }
    try {
      const [day, month, year] = registerForm.birthdayDate.split('.');
      const formattedBirthdayDate = new Date(
        `${year}-${month}-${day}`
      );
      const userData = {
        ...registerForm,
        phoneNumber: registerForm.phoneNumber.replace(/\D/g, ''),
        birthdayDate: formattedBirthdayDate.toISOString(),
      };

      setRegFormData(userData);

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

  const isFormValid = () =>
    validateRegisterForm(registerForm).isValid;

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorComponent
        error={error.error}
        userMessage={error.userMessage}
      />
    );

  if (isSuccess && registerForm.email)
    return <VerificationMethodModal />;

  return (
    <AuthFormLayout variant="register">
      <h1 className="mb-10 text-center text-2xl font-bold">
        Регистрация
      </h1>
      <h2 className="mb-6 text-center text-lg font-bold">
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
              id="phoneNumber"
              label="Телефон"
              value={registerForm.phoneNumber}
              onChangeAction={handleChange}
            />
            <PersonInput
              id="surname"
              label="Фамилия"
              value={registerForm.surname}
              onChangeAction={handleChange}
            />
            <PersonInput
              id="name"
              label="Имя"
              value={registerForm.name}
              onChangeAction={handleChange}
            />
            <PasswordInput
              id="password"
              label="Пароль"
              value={registerForm.password}
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
              value={registerForm.confirmPassword}
              onChangeAction={handleChange}
              showPassword={showPassword}
              togglePasswordVisibilityAction={() =>
                setShowPassword((prev) => !prev)
              }
              compareWith={registerForm.password}
            />
          </div>
          <div className="flex flex-col items-start gap-y-4">
            <DateInput
              id="birthdayDate"
              label="Дата рождения"
              value={registerForm.birthdayDate}
              onChangeAction={(value) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  ['birthdayDate']: value,
                }))
              }
            />
            <SelectRegion
              id="region"
              label="Регион"
              value={registerForm.region}
              onChangeAction={handleChange}
            />
            <SelectCity
              id="location"
              label="Населенный пункт"
              value={registerForm.location}
              onChangeAction={handleChange}
            />
            <GenderSelect
              label="Пол"
              value={registerForm.gender}
              onChangeAction={(gender) =>
                setRegisterForm((prev) => ({ ...prev, gender }))
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
              value={registerForm.card}
              onChangeAction={handleChange}
              disabled={!!registerForm.hasCard}
            />

            <CheckboxCard
              id="hasCard"
              checked={registerForm.hasCard}
              onChangeAction={handleChange}
            />
          </div>
          <EmailInput
            id="email"
            label="E-mail"
            value={registerForm.email}
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
    </AuthFormLayout>
  );
}

export default RegisterPage;

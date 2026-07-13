'use client';
import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout';
import { iconContainerStyles } from '@/app/(auth)/styles';
import { Smartphone, Key, ArrowLeft } from 'lucide-react';

interface AuthMethodSelectorProps {
  phoneNumber: string;
  onMethodSelectAction?: (method: 'password' | 'otp') => void;
  onBackAction?: () => void;
}

export const AuthMethodSelector: React.FC<
  AuthMethodSelectorProps
> = ({
  phoneNumber,
  onMethodSelectAction = () => {},
  onBackAction = () => {},
}) => {
  const buttonStyles = `
    flex flex-col items-center justify-center
    p-4 rounded-lg border border-gray-200
    hover:shadow-md duration-300 cursor-pointer
    relative group w-full cursor-pointer duration-300
  `;

  return (
    <AuthFormLayout>
      <div className="animate-in zoom-in-95 relative">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h2 className="mb-2 text-3xl font-bold">
              Выберите способ входа
            </h2>
            <p>
              Для номера {phoneNumber} доступны следующие варианты:
            </p>
          </div>

          <div className="w-full space-y-4">
            <button
              onClick={() => onMethodSelectAction('password')}
              className={buttonStyles}
            >
              <div className={iconContainerStyles}>
                <Key className="h-6 w-6 text-[#ff6633] group-hover:text-white" />
              </div>
              <span className="font-medium text-gray-900">
                Войти с паролем
              </span>
            </button>

            <button
              onClick={() => onMethodSelectAction('otp')}
              className={buttonStyles}
            >
              <div className={iconContainerStyles}>
                <Smartphone className="h-6 w-6 text-[#ff6633] group-hover:text-white" />
              </div>
              <span className="font-medium text-gray-900">
                Войти по SMS-коду
              </span>
            </button>
          </div>

          <button
            onClick={onBackAction}
            className="text-main-text mx-auto flex h-8 w-30 cursor-pointer items-center justify-center gap-x-2 text-xs duration-300 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Вернуться
          </button>
        </div>
      </div>
    </AuthFormLayout>
  );
};

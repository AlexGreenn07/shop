'use client';

import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout';
import { buttonStyles, formStyles } from '@/app/(auth)/styles';
import {
  HelpCircle,
  MailWarning,
  PlusCircle,
  Search,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UnverifiedEmailProps {
  email: string;
  setLoginAction: (value: string) => void;
  setShowUnverifiedEmailAction: (value: boolean) => void;
}

export const UnverifiedEmail = ({
  email,
  setLoginAction,
  setShowUnverifiedEmailAction,
}: UnverifiedEmailProps) => {
  const router = useRouter();
  return (
    <AuthFormLayout>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <MailWarning className="h-8 w-8 text-[#ff6633]" />

        <h2 className="text-main-text text-2xl font-medium tracking-tight">
          Требуется{' '}
          <span className="font-semibold text-[#ff6633]">
            подтверждение
          </span>
        </h2>

        <div className="w-full">
          <div className="flex w-full flex-col items-center rounded border border-gray-100 bg-white/95 p-4 shadow-xs">
            <p className="text-main-text text-sm font-light">
              Письмо отправлено на:
            </p>
            <p className="text-main-text mt-1 text-lg font-medium">
              {email}
            </p>
            <p className="mt-2 text-xs font-light text-gray-400">
              Проверьте все папки, включая «Спам»
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <button
            onClick={() => {
              setLoginAction('');
              setShowUnverifiedEmailAction(false);
            }}
            className={`${buttonStyles.active} cursor-pointer rounded [&&]:w-full`}
          >
            <span className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white">
              <PlusCircle className="h-5 w-5" />
              <span className="translate-y-px">
                Подтвердить и войти заново
              </span>
            </span>
          </button>
          <button
            onClick={() => {
              setLoginAction('');
              setShowUnverifiedEmailAction(false);
            }}
            className={`${formStyles.loginLink} text-primary w-full cursor-pointer rounded hover:text-white [&&]:my-auto [&&]:h-auto`}
          >
            <span className="relative flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white">
              <Search className="text-primary h-5 w-5 transition-colors duration-300" />
              <span className="translate-y-px">
                Использовать другой email
              </span>
            </span>
          </button>
          <button
            onClick={() => {
              setLoginAction('');
              setShowUnverifiedEmailAction(false);
              router.replace('/contacts');
            }}
            className={`w-full cursor-pointer rounded border border-gray-300 duration-300 hover:bg-gray-300`}
          >
            <span className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white">
              <HelpCircle className="h-5 w-5" />
              <span className="translate-y-px">
                Подтвердить и войти заново
              </span>
            </span>
          </button>
        </div>
      </div>
    </AuthFormLayout>
  );
};

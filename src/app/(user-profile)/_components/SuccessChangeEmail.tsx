'use client';

import { MailCheck } from 'lucide-react';
import { buttonStyles } from '@/app/(auth)/styles';
import { useRouter } from 'next/navigation';

export const SuccessChangeEmail = ({
  email,
  newEmail,
}: {
  email: string;
  newEmail: string;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="bg-primary rounded-full p-3">
          <MailCheck className="h-8 w-8 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Письмо отправлено!
          </h2>
          <p className="max-w-md text-gray-600">
            Мы отправили email с подтверждением на прежнюю{' '}
            <span className="font-semibold text-[#ff6633]">
              ({email})
            </span>{' '}
            и новую{' '}
            <span className="text-primary font-semibold">
              {' '}
              ({newEmail})
            </span>{' '}
            почту. Пожалуйста, проверьте и следуйте инструкциям.
          </p>
        </div>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={() => router.replace('/login')}
          className={`${buttonStyles.active} w-full cursor-pointer rounded px-4 py-2`}
        >
          Перейти к авторизации с новым email
        </button>
      </div>
    </div>
  );
};

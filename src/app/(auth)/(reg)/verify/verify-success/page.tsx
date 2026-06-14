'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { AuthFormLayout } from '../../../_components/AuthFormLayout';
import { buttonStyles } from '@/app/(auth)/styles';

export default function VerifySuccessPage() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 5000);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <AuthFormLayout>
      <div className="p-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-(--color-primary)">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-[#414141]">
          Email успешно подтвержден!
        </h1>

        <p className="mb-6 text-gray-600">
          Ваш адрес электронной почты был успешно подтвержден. Теперь
          Вы можете войти в свой аккаунт.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.replace('/login')}
            className={`${buttonStyles.active} cursor-pointer rounded px-4 py-2`}
          >
            Перейти к авторизации
          </button>

          <p className="text-sm text-gray-500">
            Автоматический переход через {secondsLeft}{' '}
            {secondsLeft % 10 === 1 && secondsLeft % 100 !== 11
              ? 'секунду'
              : secondsLeft % 10 >= 2 &&
                  secondsLeft % 10 <= 4 &&
                  (secondsLeft % 100 < 10 || secondsLeft % 100 >= 20)
                ? 'секунды'
                : 'секунд'}
            ...
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-8 py-4">
        <p className="text-center text-xs text-gray-500">
          Нужна помощь?{' '}
          <Link
            href="/contacts"
            className="text-[#ff6633] hover:underline"
          >
            Свяжитесь с поддержкой
          </Link>
        </p>
      </div>
    </AuthFormLayout>
  );
}

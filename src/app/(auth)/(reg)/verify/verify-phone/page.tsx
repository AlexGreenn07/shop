'use client';

import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout';
import { useRegFormContext } from '@/app/contexts/RegFormContext';
import { authClient } from '@/lib/auth-client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LoadingContent } from '../../_components/LoadingContent';
import { ErrorContent } from '../../_components/ErrorContent';
import { PhoneOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EnterCode from '@/app/(auth)/_components/EnterCode';

export default function VerifyPhonePage() {
  const { regFormData } = useRegFormContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const hasSentInitialRequest = useRef(false);
  const router = useRouter();
  const phoneNumber = regFormData.phoneNumber;

  const checkPhoneNumberExists = async (phoneNumber: string) => {
    try {
      const response = await fetch('/api/auth/check-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      if (!response.ok) {
        throw new Error('Ошибка при проверке номера телефона');
      }

      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Ошибка при проверке номера телефона:', error);
      return false;
    }
  };

  const verifyAccount = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const exists = await checkPhoneNumberExists(phoneNumber);
      if (exists) {
        throw new Error(
          'Пользователь с таким номером телефона уже существует. Пожалуйста, используйте другой номер или войдите в существующий аккаунт.'
        );
      }
      await authClient.phoneNumber.sendOtp(
        {
          phoneNumber,
        },
        {
          onSuccess: () => {
            setVerificationSent(true);
            setIsLoading(false);
          },
          onError: (ctx) => {
            setIsLoading(false);
            setVerificationSent(false);
            setError(
              ctx.error?.message ||
                'Неизвестная ошибка при отправке СМС.'
            );
          },
        }
      );
    } catch (error) {
      setIsLoading(false);
      setVerificationSent(false);
      setError(
        error instanceof Error ? error.message : 'Неизвестная ошибка.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (!hasSentInitialRequest.current && phoneNumber) {
      hasSentInitialRequest.current = true;
      verifyAccount();
    }
  }, [phoneNumber, verifyAccount]);

  const handleToLogin = () => {
    router.replace('/login');
  };
  const handleRetry = () => {
    verifyAccount();
  };
  return (
    <AuthFormLayout>
      {isLoading ? (
        <LoadingContent title="СМС..." />
      ) : error ? (
        <ErrorContent
          error={error}
          icon={<PhoneOff className="h-8 w-8 text-red-600" />}
          primaryAction={{ label: 'Войти', onClick: handleToLogin }}
          secondaryAction={{
            label: 'Повторить отправку',
            onClick: handleRetry,
          }}
        />
      ) : verificationSent ? (
        <EnterCode phoneNumber={phoneNumber} />
      ) : null}
    </AuthFormLayout>
  );
}

'use client';

import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout';
import { useRegFormContext } from '@/app/contexts/RegFormContext';
import { authClient } from '@/lib/auth-client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LoadingContent } from '../../_components/LoadingContent';
import { ErrorContent } from '../../_components/ErrorContent';
import { MailWarning } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SuccessSent } from '../../_components/SuccessSent';

export default function VerifyEmailPage() {
  const { regFormData } = useRegFormContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const hasSentInitialRequest = useRef(false);
  const router = useRouter();

  const verifyAccount = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (!regFormData.email) {
        throw new Error('Email обязателен для верификации.');
      }
      await authClient.signUp.email(
        {
          ...regFormData,
          email: regFormData.email,
          callbackURL: `/verify/verify-success`,
        },
        {
          onSuccess: () => {
            setVerificationSent(true);
            setIsLoading(false);
          },
          onError: (ctx) => {
            setIsLoading(false);
            setVerificationSent(false);
            const errorMessage =
              ctx.error?.message || 'Неизвестная ошибка';

            if (errorMessage.includes('already exists')) {
              setError(
                'Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в существующий аккаунт.'
              );
            } else {
              setError(errorMessage);
            }
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
  }, [regFormData]);

  useEffect(() => {
    if (!hasSentInitialRequest.current && regFormData.email) {
      hasSentInitialRequest.current = true;
      verifyAccount();
    }
  }, [regFormData.email, verifyAccount]);

  const handleToLogin = () => {
    router.replace('/login');
  };
  const handleResend = () => {
    verifyAccount();
  };
  return (
    <AuthFormLayout>
      {isLoading ? (
        <LoadingContent title="Отправка письма..." />
      ) : error ? (
        <ErrorContent
          error={error}
          icon={<MailWarning className="h-8 w-8 text-red-600" />}
          primaryAction={{ label: 'Войти', onClick: handleToLogin }}
          secondaryAction={{
            label: 'Повторить отправку',
            onClick: handleResend,
          }}
        />
      ) : verificationSent ? (
        <SuccessSent />
      ) : null}
    </AuthFormLayout>
  );
}

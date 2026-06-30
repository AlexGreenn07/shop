import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout';
import { MailCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SuccessSentEmail = ({ email }: { email: string }) => {
  const router = useRouter();

  return (
    <AuthFormLayout>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col items-center">
          <MailCheck className="text-primary mb-4 h-12 w-12" />
          <h1 className="text-center text-2xl font-bold">
            Проверьте Вашу почту
          </h1>
        </div>

        <p>
          Если Вы <strong>регистрировались по email</strong> и аккаунт
          с email <strong>{email}</strong> существует в нашей системе,
          мы отправили письмо с инструкциями по сбросу пароля.
        </p>

        <div className="text-primary border-primary rounded border bg-white p-4">
          <h3 className="mb-2 font-semibold">Не получили письмо?</h3>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li>Проверьте папку «Спам» или «Нежелательная почта»</li>
            <li>
              Убедитесь, что Вы регистрировались именно по email, а не
              по номеру телефона
            </li>
            <li>
              Попробуйте войти с помощью номера телефона, если Вы его
              указывали
            </li>
            <li>Письмо может приходить с задержкой до 5-10 минут</li>
          </ul>
        </div>

        <div className="mt-4 rounded border border-[#ff6633] bg-white p-4">
          <h3 className="mb-2 font-semibold text-[#ff6633]">
            Регистрировались по телефону?
          </h3>
          <p className="text-sm text-[#ff6633]">
            Если Вы не помните, как регистрировались, попробуйте
            <button
              type="button"
              onClick={() => router.replace('/login')}
              className="ml-1 cursor-pointer font-medium text-[#ff6633] underline duration-300 hover:no-underline"
            >
              войти с помощью номера телефона
            </button>
          </p>
        </div>
      </div>
    </AuthFormLayout>
  );
};

export default SuccessSentEmail;

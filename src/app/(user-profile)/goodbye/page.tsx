import Link from 'next/link';
import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout';

export default function GoodbyePage() {
  return (
    <AuthFormLayout>
      <div className="flex flex-col items-center justify-center bg-white">
        <h1 className="text-main-text mb-4 text-2xl font-bold">
          Ваш аккаунт был удален
        </h1>
        <p className="text-main-text mb-6">
          Спасибо, что были с нами. Все ваши данные были успешно
          удалены.
        </p>
        <Link
          href="/"
          className="bg-primary w-full cursor-pointer rounded px-3 py-2 text-center text-2xl text-white duration-300 hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active)"
        >
          На главную
        </Link>
      </div>
    </AuthFormLayout>
  );
}

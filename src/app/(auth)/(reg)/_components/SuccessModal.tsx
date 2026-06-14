import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AuthFormLayout } from '../../_components/AuthFormLayout';

const SuccessModal = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <AuthFormLayout>
      <h2 className="mb-4 text-2xl font-bold text-(--color-primary)">
        Регистрация прошла успешно!
      </h2>
      <p>Сейчас вы будете перенаправлены на страницу входа</p>
      <div className="h-2.5 w-full rounded-full bg-gray-200">
        <div
          className="h-2.5 animate-[progress_3s_linear] rounded-full bg-(--color-primary)"
          style={{ animationFillMode: 'forwards' }}
        ></div>
      </div>
    </AuthFormLayout>
  );
};

export default SuccessModal;

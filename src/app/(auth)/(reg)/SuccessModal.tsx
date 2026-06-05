import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SuccessModal = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="fixed inset-0 z-100 flex min-h-screen items-center justify-center bg-[#fcd5acc]">
      <div className="mx-4 max-w-md rounded bg-white p-8 text-center shadow-xl">
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
      </div>
    </div>
  );
};

export default SuccessModal;

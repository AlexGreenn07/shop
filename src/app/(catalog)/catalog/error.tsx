'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  const handleRetry = () => {
    startTransition(() => {
      reset(); // Сброс клиентского состояния
      router.refresh(); // Перезагрузка серверных данных
    });
  };
  return (
    <div className="m-4 flex items-center justify-center rounded bg-red-100 p-4 text-red-800">
      <p>Ошибка: {error.message}</p>
      <button
        onClick={handleRetry}
        className="ml-2 cursor-pointer rounded bg-red-500 px-3 py-1 text-white"
      >
        Попробовать снова
      </button>
    </div>
  );
}

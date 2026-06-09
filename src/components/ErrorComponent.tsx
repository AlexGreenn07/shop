'use client';

import { ErrorProps } from '@/types/errorProps';

function ErrorComponent({ error, userMessage }: ErrorProps) {
  console.error('Произошла ошибка:', error);

  return (
    <div className="m-4 rounded bg-red-100 p-4 text-center text-red-800">
      <p>
        {userMessage ||
          'Произошла ошибка. Пожалуйста, попробуйте позже.'}
      </p>
      <button
        className="mt-2 cursor-pointer rounded bg-red-500 px-3 py-1 text-white"
        onClick={() => window.location.reload()}
      >
        Попробовать снова
      </button>
    </div>
  );
}

export default ErrorComponent;

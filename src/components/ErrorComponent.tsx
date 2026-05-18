'use client';

import { ErrorProps } from '@/types/errorProps';

function ErrorComponent({ error, userMessage }: ErrorProps) {
  console.error('Произошла ошибка:', error);

  return (
    <div>
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

'use client';

import { RotateCw, XCircle } from 'lucide-react';
import { ReactNode } from 'react';

type ErrorContentProps = {
  error: string | null;
  icon?: ReactNode;
  title?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    className?: string;
  };
  secondaryAction?: {
    label: string | React.ReactNode;
    onClick: () => void;
    className?: string;
  };
};

export const ErrorContent = ({
  error,
  icon = <XCircle className="h-8 w-8 text-red-600" />,
  title = 'Ошибка отправки',
  primaryAction,
  secondaryAction,
}: ErrorContentProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="rounded-full bg-red-100 p-3">{icon}</div>
        <div className="space-y-2">
          <h3 className="text-main-text text-2xl font-bold">
            {title}
          </h3>
          {error && <p className="max-w-md text-gray-600">{error}</p>}
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className={`flex w-full cursor-pointer items-center justify-center space-x-2 rounded bg-[#d80000] px-4 py-3 text-white shadow-md duration-300 hover:shadow-lg ${primaryAction.className}`}
          >
            <span>{primaryAction.label}</span>
          </button>
        )}

        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className={`flex w-full cursor-pointer items-center justify-center gap-6 rounded border border-gray-300 px-4 py-3 text-gray-700 duration-300 hover:bg-gray-200 ${secondaryAction.className}`}
          >
            <RotateCw className="h-4 w-4" />
            <span>{secondaryAction.label}</span>
          </button>
        )}
      </div>
    </div>
  );
};

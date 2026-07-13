import { RotateCw } from 'lucide-react';
import React from 'react';

export const LoadingContent = ({
  title,
}: {
  title: string | React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <RotateCw className="h-10 w-10 animate-spin text-[#ff6633]" />
        <div className="border-opacity-20 absolute inset-0 animate-ping rounded-full border-2 border-[#ff6633]"></div>
      </div>
      <div className="text-main-text space-y-2 text-center">
        <h3 className="text-main-text text-xl font-semibold">
          {title}
        </h3>
        <p>Пожалуйста, подождите...</p>
      </div>
    </div>
  );
};

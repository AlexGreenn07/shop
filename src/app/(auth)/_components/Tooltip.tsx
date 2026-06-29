import Image from 'next/image';

type TooltipProps = {
  text: string;
  position?: 'top' | 'bottom'; // Добавляем пропс для управления позицией
};

const Tooltip = ({ text, position = 'bottom' }: TooltipProps) => {
  return (
    <div
      className={`absolute left-0 mt-2 w-full transition-all duration-300 ease-in-out ${
        position === 'top' ? '-top-12' : ''
      }`}
    >
      <div
        className={`animate-fadeIn relative z-50 mx-auto flex max-w-65 items-center rounded bg-[#d80000] p-2 text-sm text-white opacity-0 ${
          position === 'bottom' ? 'mb-2' : 'mt-1'
        }`}
      >
        <Image
          src="/icons-auth/icon-attention.svg"
          alt={text}
          width={21}
          height={21}
          className={`${position === 'bottom' ? 'mr-4' : 'mx-4'}`}
        />
        {/* Треугольник внизу, если position="top" */}
        {position === 'top' ? (
          <div className="absolute -bottom-0.75 left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-4 border-r-[6px] border-l-[6px] border-t-[#d80000] border-r-transparent border-l-transparent"></div>
        ) : (
          // Треугольник вверху (по умолчанию)
          <div className="absolute -top-0.75 left-1/2 h-0 w-0 -translate-x-1/2 transform border-r-[6px] border-b-4 border-l-[6px] border-r-transparent border-b-[#d80000] border-l-transparent"></div>
        )}
        {text}
      </div>
    </div>
  );
};

export default Tooltip;

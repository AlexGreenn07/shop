import Image from 'next/image';

const Tooltip = ({ text }: { text: string }) => {
  return (
    <div className="absolute top-full left-0 mt-1 w-full transition-all duration-300 ease-in-out">
      <div className="animate-fadeIn relative z-50 mx-auto flex max-w-65 items-center rounded bg-[#d80000] p-2 text-sm text-white opacity-0">
        <Image
          src="/icons-auth/icon-attention.svg"
          alt={text}
          width={21}
          height={21}
          className="mr-4"
        />
        <div className="absolute -top-0.75 left-1/2 h-0 w-0 -translate-x-1/2 transform border-r-[6px] border-b-4 border-l-[6px] border-r-transparent border-b-[#d80000] border-l-transparent"></div>
        {text}
      </div>
    </div>
  );
};

export default Tooltip;

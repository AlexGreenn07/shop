import Image from 'next/image';
import iconSearch from '../../../public/icons-header/icon-search.svg';
function InputBlock() {
  return (
    <>
      <div className="relative min-w-65.25 grow">
        <input
          type="text"
          placeholder="Найти товар"
          className="h-10 w-full rounded p-2 text-base leading-[150%] text-[#8f8f8f] outline outline-(--color-primary) focus:shadow-(--shadow-button-default)"
        />
        <button className="absolute top-2 right-2 cursor-pointer">
          <Image src={iconSearch} alt="Поиск" width={24} height={24} />
        </button>
      </div>
    </>
  );
}

export default InputBlock;

import Image from 'next/image';

function ButtonSearch() {
  return (
    <>
      <button className="hover: hidden w-10 cursor-pointer gap-4 rounded bg-(--color-primary) p-2 duration-300 hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active) md:flex lg:w-35">
        <Image
          src="/icons-header/icon-menu.svg"
          alt="Меню"
          width={24}
          height={24}
          className="hidden md:block"
        />
        <span className="hidden text-base text-white lg:block">Каталог</span>
      </button>
    </>
  );
}

export default ButtonSearch;

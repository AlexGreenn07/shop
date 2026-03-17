import UserBlock from './UserBlock';
import LogoBlock from './LogoBlock';
import SearchBlock from './SearchBlock';

function Header() {
  return (
    <header className="relative z-10 flex w-full flex-col justify-center bg-white md:flex-row md:gap-10 md:gap-y-5 md:p-2 md:shadow-(--shadow-default) xl:gap-y-7">
      <div className="flex flex-row items-center gap-4 px-4 py-2 shadow-(--shadow-default) md:shadow-none xl:gap-10">
        <LogoBlock />
        <SearchBlock />
      </div>
      <UserBlock />
    </header>
  );
}

export default Header;

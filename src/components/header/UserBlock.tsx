import Profile from './Profile';
import TopMenu from './TopMenu';

function UserBlock() {
  return (
    <nav aria-label="Основное меню">
      <div className="fixed right-0 bottom-0 left-0 z-50 flex h-14 w-full flex-row items-center justify-between bg-white px-4 py-2 text-[8px] shadow-(--shadow-default) md:static md:h-auto md:text-[12px] md:shadow-none">
        <TopMenu />
        <Profile />
      </div>
    </nav>
  );
}

export default UserBlock;

import Image from 'next/image';
import avatar from '../../../public/icons-header/graphics/avatar.png';
import iconArrow from '../../../public/icons-header/icon-arrow.svg';
import Link from 'next/link';

function Profile() {
  const user = false;
  if (!user) {
    return (
      <Link
        href="/login"
        className="ml-6 flex w-10 items-center justify-between gap-x-2 rounded bg-[#ff6633] p-2 text-base text-white duration-300 hover:shadow-(--shadow-article) active:shadow-(--shadow-button-active) xl:w-39.25"
      >
        <div className="w-full justify-evenly xl:flex">
          <p className="hidden xl:flex">Войти</p>

          <Image
            src="/icons-header/icon-entry.svg"
            alt="Войти"
            width={24}
            height={24}
          />
        </div>
      </Link>
    );
  }
  return (
    <div className="ml-6 flex flex-1 items-center justify-end gap-2.5 p-2 md:ml-2 xl:ml-6">
      <Image
        src={avatar}
        alt="Ваш профиль"
        width={40}
        height={40}
        className="h-auto min-h-10 min-w-10"
      />
      <p className="hidden cursor-pointer p-2.5 xl:block">Алексей</p>
      <button className="hidden cursor-pointer p-2 xl:block">
        <Image
          src={iconArrow}
          alt="Меню профиля"
          width={24}
          height={24}
          sizes="24px"
          style={{ height: 'auto' }}
        />
      </button>
    </div>
  );
}

export default Profile;

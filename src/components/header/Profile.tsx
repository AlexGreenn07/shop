import Image from 'next/image';
import avatar from '../../../public/icons-header/graphics/avatar.png';
import iconArrow from '../../../public/icons-header/icon-arrow.svg';

function Profile() {
  return (
    <div className="ml-6 flex flex-1 items-center justify-end gap-2.5 p-2">
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

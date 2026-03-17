import Image from 'next/image';
import iconHeart from '../../../public/icons-header/icon-heart.svg';
import iconBox from '../../../public/icons-header/icon-box.svg';
import iconCart from '../../../public/icons-header/icon-cart.svg';
import iconMenuMob from '../../../public/icons-header/icon-menu-mob.svg';

function TopMenu() {
  return (
    <ul className="flex flex-row items-end gap-x-6">
      <li className="flex w-11 cursor-pointer flex-col items-center gap-2.5 md:hidden">
        <Image
          src={iconMenuMob}
          alt="Меню"
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
        />
        <span>Каталог</span>
      </li>
      <li className="flex w-11 cursor-pointer flex-col items-center gap-2.5">
        <Image
          src={iconHeart}
          alt="Меню"
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
        />
        <span>Избранное</span>
      </li>
      <li className="flex w-11 cursor-pointer flex-col items-center gap-2.5">
        <Image
          src={iconBox}
          alt="Меню"
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
        />
        <span>Заказы</span>
      </li>
      <li className="flex w-11 cursor-pointer flex-col items-center gap-2.5">
        <Image
          src={iconCart}
          alt="Меню"
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
        />
        <span>Корзина</span>
      </li>
    </ul>
  );
}

export default TopMenu;

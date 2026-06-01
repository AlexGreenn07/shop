import Image from 'next/image';
import iconHeart from '../../../public/icons-header/icon-heart.svg';
import iconBox from '../../../public/icons-header/icon-box.svg';
import iconCart from '../../../public/icons-header/icon-cart.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IconMenuMob from '../svg/IconMenuMob';

function TopMenu() {
  const pathname = usePathname();
  const isCatalogPage = pathname === '/catalog';
  return (
    <ul className="flex flex-row items-end gap-x-6">
      <Link href="/catalog">
        <li className="flex w-11 cursor-pointer flex-col items-center gap-2.5 md:hidden">
          <IconMenuMob isCatalogPage={isCatalogPage} />
          <span
            className={`${isCatalogPage ? 'text-[#ff6633]' : 'text-[#414141]'}`}
          >
            Каталог
          </span>
        </li>
      </Link>
      <li className="flex w-11 cursor-pointer flex-col items-center gap-2.5">
        <Image
          src={iconHeart}
          alt="Избранное"
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
        />
        <span>Избранное</span>
      </li>
      <li className="flex w-11 cursor-pointer flex-col items-center gap-2.5">
        <Image
          src={iconBox}
          alt="Заказы"
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
        />
        <span>Заказы</span>
      </li>
      <li className="flex w-11 cursor-pointer flex-col items-center gap-2.5">
        <Image
          src={iconCart}
          alt="Корзина"
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

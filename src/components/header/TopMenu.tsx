import Image from 'next/image';
import iconHeart from '../../../public/icons-header/icon-heart.svg';
import iconCart from '../../../public/icons-header/icon-cart.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IconMenuMob from '../svg/IconMenuMob';
import { useAuthStore } from '@/store/authStore';
import IconBox from '../svg/IconBox';

function TopMenu() {
  const pathname = usePathname();
  const isCatalogPage = pathname === '/catalog';
  const { user } = useAuthStore();

  const isManagerOrAdmin =
    user?.role === 'manager' || user?.role === 'admin';

  return (
    <ul className="flex flex-row items-end gap-x-6 md:gap-x-5">
      <Link href="/catalog">
        <li className="flex w-11 cursor-pointer flex-col items-center gap-2.5 md:hidden">
          <IconMenuMob isCatalogPage={isCatalogPage} />
          <span
            className={`${isCatalogPage ? 'text-[#ff6633]' : 'text-main-text'}`}
          >
            Каталог
          </span>
        </li>
      </Link>
      {!isManagerOrAdmin && (
        <li className="flex w-11 cursor-pointer flex-col items-center gap-1">
          <Image
            src={iconHeart}
            alt="Избранное"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          <span>Избранное</span>
        </li>
      )}

      <li className="flex w-11 cursor-pointer flex-col items-center gap-1">
        <IconBox />
        <span
          className={`${isManagerOrAdmin ? 'text-[#ff6633]' : 'text-black'} `}
        >
          Заказы
        </span>
      </li>
      {!isManagerOrAdmin && (
        <li className="flex w-11 cursor-pointer flex-col items-center gap-1">
          <Image
            src={iconCart}
            alt="Корзина"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          <span>Корзина</span>
        </li>
      )}
    </ul>
  );
}

export default TopMenu;

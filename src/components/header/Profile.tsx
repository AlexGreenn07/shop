'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import iconArrow from '../../../public/icons-header/icon-arrow.svg';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { getAvatarByGender } from '@/utils/getAvatarByGender';

const Profile = () => {
  const { isAuth, user, logout, checkAuth, isLoading } =
    useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();

      router.replace('/');
    } catch (error) {
      console.error('Не удалось выйти:', error);
    } finally {
      setIsLoggingOut(false);
      setIsMenuOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="ml-6 h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
    );
  }

  if (!isAuth) {
    return (
      <Link
        href="/login"
        className="ml-6 flex w-10 cursor-pointer items-center justify-between gap-x-2 rounded bg-[#ff6633] p-2 text-base text-white duration-300 hover:shadow-(--shadow-article) active:shadow-(--shadow-button-active) xl:w-39.25"
      >
        <div className="hidden w-27.25 justify-center xl:flex">
          <p>Войти</p>
        </div>
        <Image
          src="/icons-header/icon-entry.svg"
          alt="Войти"
          width={24}
          height={24}
        />
      </Link>
    );
  }

  return (
    <div className="relative ml-6" ref={menuRef}>
      <div
        className="flex cursor-pointer items-center gap-2.5"
        onClick={toggleMenu}
      >
        <Image
          src={getAvatarByGender(user?.gender)}
          alt="Ваш профиль"
          width={40}
          height={40}
          className="min-h-10 min-w-10 rounded-full object-cover md:block xl:block"
        />
        <p className="hidden cursor-pointer p-2.5 xl:block">
          {isLoading ? 'Загрузка...' : user?.name}
        </p>
        <div className="hidden xl:block">
          <Image
            src={iconArrow}
            alt="Меню профиля"
            width={24}
            height={24}
            sizes="24px"
            className={`transform transition-transform duration-300 ${
              isMenuOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </div>

      {/* Выпадающее меню */}
      <div
        className={`shadow-button-secondary absolute right-0 z-50 overflow-hidden rounded bg-white ${
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        } min-w-50 transition-all duration-300 ${
          isMobile ? 'top-auto bottom-full mb-6' : 'top-full mt-6'
        }`}
      >
        <Link
          href="/user-profile"
          className="block px-4 py-3 text-[#414141] duration-300 hover:text-[#ff6633]"
          onClick={() => setIsMenuOpen(false)}
        >
          Профиль
        </Link>
        <Link
          href="/"
          className="block px-4 py-3 text-[#414141] duration-300 hover:text-[#ff6633]"
          onClick={() => setIsMenuOpen(false)}
        >
          Главная
        </Link>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full cursor-pointer border-t border-gray-200 px-4 py-3 text-left text-[#414141] duration-300 hover:text-[#ff6633] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoggingOut ? 'Выход...' : 'Выйти'}
        </button>
      </div>
    </div>
  );
};

export default Profile;

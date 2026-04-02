'use client';

import Image from 'next/image';
import Link from 'next/link';
import { socials } from '@/data/socials';

function Footer() {
  const navLinks = [
    { title: 'О компании', href: '#' },
    { title: 'Контакты', href: '#' },
    { title: 'Статьи', href: '#' },
    { title: 'Вакансии', href: '#' },
    { title: 'Политика обработки персональных данных', href: '#' },
  ];
  return (
    <footer className="relative isolate mb-14 w-full bg-[#f9f4e2] px-[max(12px,calc((100%-1208px)/2))] md:mb-0">
      <div className="absolute inset-0 -z-10 bg-[url('/images/graphics/pattern-footer.png')] opacity-50" />
      <div className="grid grid-cols-2 items-center gap-y-4 px-7 py-10 text-[#414141] [grid-template-areas:'logo_social''logo_phone''nav_nav''design_design'] md:grid-cols-[auto_1fr_auto_auto] md:gap-x-6 md:[grid-template-areas:'logo_nav_social_phone''logo_nav_social_design'] xl:gap-x-10 xl:[grid-template-areas:'logo_nav_social_phone''._._._design']">
        <div className="[grid-area:logo]">
          <Link
            href="/"
            className="relative block h-16 w-23 md:h-11 md:w-16"
          >
            <Image
              src="/icons-footer/logo-footer.png"
              alt="Логотип"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        <div className="flex flex-row gap-5 justify-self-end [grid-area:social] md:w-18 md:flex-wrap xl:w-auto">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="shrink-0 hover:scale-120"
            >
              <Image
                src={social.icon}
                alt={social.alt}
                width={24}
                height={24}
                className="transition-opacity duration-300 hover:opacity-80"
              />
            </a>
          ))}
        </div>
        <div className="justify-self-end [grid-area:phone]">
          <a
            href="tel:+78007773333"
            className="group flex items-center gap-x-2 hover:scale-110"
          >
            <Image
              src="/icons-footer/phone.svg"
              alt="Иконка телефона"
              width={20}
              height={20}
            />
            <p className="text-[18px] transition-colors duration-300 group-hover:text-black">
              8 800 777 33 33
            </p>
          </a>
        </div>
        <nav className="[grid-area:nav]">
          <ul className="flex flex-wrap gap-4 gap-x-6 text-xs md:gap-x-8 xl:gap-x-10 xl:gap-y-2">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="transition-colors duration-300 hover:text-black"
              >
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="[grid-area:design] md:justify-self-end">
          <a
            href="https://zasovskiy.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-2 hover:scale-110"
          >
            <p className="text-xs">Дизайн</p>
            <Image
              src="/icons-footer/design.svg"
              alt="Дизайн сайта — студия Zasovskiy"
              width={100}
              height={10}
              className="transition-all hover:brightness-90"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

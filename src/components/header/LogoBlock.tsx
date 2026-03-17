import Image from 'next/image';
import Link from 'next/link';

function LogoBlock() {
  return (
    <Link href="/" className="flex cursor-pointer flex-row items-center gap-3">
      <div className="relative h-8 w-10 md:h-10 md:w-12 xl:h-8 xl:w-10">
        <Image
          src="/icons-header/icon-logo.svg"
          alt="Логотип"
          fill
          sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="relative hidden h-3 w-25 md:block">
        <Image
          src="/icons-header/icon-text.png"
          alt="Северяночка"
          fill
          sizes="100px"
        />
      </div>
    </Link>
  );
}

export default LogoBlock;

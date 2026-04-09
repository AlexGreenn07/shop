import Image from 'next/image';
import iconRight from '../../public/icons-header/icon-arrow-right.svg';
import Link from 'next/link';

function ViewAllButton({
  btnText,
  href,
}: {
  btnText: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex cursor-pointer flex-row items-center gap-x-2"
    >
      <p className="text-center text-base text-[#606060] hover:text-[#bfbfbf]">
        {btnText}
      </p>
      <Image
        src={iconRight}
        alt={btnText}
        width={24}
        height={24}
        sizes="24px"
      />
    </Link>
  );
}

export default ViewAllButton;

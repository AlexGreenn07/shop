'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
function CloseButton() {
  const router = useRouter();

  const handleClose = () => {
    router.replace('/');
  };

  return (
    <button
      onClick={handleClose}
      className="absolute top-0 right-0 cursor-pointer rounded bg-[#f3f2f1] duration-300"
      aria-label="Закрыть"
    >
      <Image
        src="/icons-auth/icon-closer.svg"
        alt="Закрыть окно аутентификации"
        width={24}
        height={24}
      />
    </button>
  );
}

export default CloseButton;

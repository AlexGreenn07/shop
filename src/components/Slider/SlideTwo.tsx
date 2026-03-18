import Image from 'next/image';

function SlideTwo() {
  return (
    <div className="relative mb-10 h-20 w-full md:mb-15 md:h-40 xl:mb-20 xl:h-50">
      <Image
        src="/images/graphics/slide-2.jpg"
        alt="Слайд"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}

export default SlideTwo;

import Image from 'next/image';

function SlideOne() {
  return (
    <div className="relative flex h-20 items-center justify-center overflow-hidden bg-[url('/images/graphics/pattern-slider.png')] bg-contain bg-repeat md:h-40 xl:h-50">
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative z-10 flex flex-row items-center justify-center gap-x-2 xl:gap-x-4">
        <div className="relative top-7 hidden md:block md:h-33 md:w-50 xl:h-50 xl:w-75">
          <Image
            src="/images/graphics/food.png"
            alt="Слайд"
            fill
            sizes="(max-width: 768px) 50px, (max-width: 1200px) 75px, 100px"
          />
        </div>
        <h2 className="text-lg font-bold text-[#414141] md:text-2xl xl:text-5xl">
          Доставка бесплатно от 1000 ₽
        </h2>
      </div>
    </div>
  );
}

export default SlideOne;

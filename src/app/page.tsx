import Actions from './(products)/Actions';
import Maps from '@/components/Maps';
import NewProducts from './(products)/NewProducts';
import Purchases from './(user)/Purchases';
import Slider from '@/components/slider/Slider';
import SpecialOffers from '@/components/SpecialOffers';
import Articles from './(articles)/Articles';
import { Suspense } from 'react';
import { Loader } from '@/components/Loader';

interface HomeSection {
  Component: React.ComponentType;
  text: string;
}

const SECTIONS: HomeSection[] = [
  { Component: Actions, text: 'акций' },
  { Component: NewProducts, text: 'новинок' },
  { Component: Purchases, text: 'Ваших покупок' },
  { Component: SpecialOffers, text: 'специальных предложений' },
  { Component: Maps, text: 'карты' },
  { Component: Articles, text: 'статей' },
];

export default function Home() {
  return (
    <main className="mx-auto mb-20 w-full">
      <Suspense fallback={<Loader text="слайдера" />}>
        <Slider />
      </Suspense>
      <div className="flex flex-col gap-y-20 px-[max(12px,calc((100%-1208px)/2))] md:mb-25 xl:mb-30">
        {SECTIONS.map(({ Component, text }, index) => (
          <Suspense key={index} fallback={<Loader text={text} />}>
            <Component />
          </Suspense>
        ))}
      </div>
    </main>
  );
}

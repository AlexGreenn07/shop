import Actions from '@/components/Actions';
import Maps from '@/components/Maps';
import NewProducts from '@/components/NewProducts';
import Purchases from '@/components/Purchases';
import Slider from '@/components/Slider/Slider';
import SpecialOffers from '@/components/SpecialOffers';
import Articles from '@/components/Articles';

export default function Home() {
  return (
    <main className="mx-auto mb-20 w-full">
      <Slider />
      <div className="flex flex-col gap-y-20 px-[max(12px,calc((100%-1208px)/2))] md:mb-25 xl:mb-30">
        <Actions />
        <NewProducts />
        <Purchases />
        <SpecialOffers />
        <Maps />
        <Articles />
      </div>
    </main>
  );
}

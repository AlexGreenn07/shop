import Image from 'next/image';
import bannerCard from '../../public/images/banners/banner-card-image.png';
import bannerActionMobTab from '../../public/images/banners/banner-action-mob-tab.jpeg';
import bannerActionDesk from '../../public/images/banners/banner-action-desk.jpeg';

const SpecialOffers = () => {
  return (
    <section>
      <div className="mb-4 flex flex-col justify-between text-[#414141] md:mb-8 xl:mb-10">
        <div className="mx-auto flex flex-col gap-4 md:w-full xl:w-full">
          <h2 className="mb-4 text-left text-2xl font-bold md:mb-8 xl:text-4xl">
            Специальные предложения
          </h2>
          <div className="flex flex-col justify-around gap-4 md:flex-row xl:w-auto">
            {/* Баннер с картой - всегда видим */}
            <button className="relative flex h-42.5 w-full max-w-84 cursor-pointer flex-row overflow-hidden rounded bg-[#FCD5BA] pt-5 pl-5 text-left duration-300 hover:shadow-(--shadow-card-shop) md:max-w-88 xl:h-50 xl:max-w-146">
              <div className="flex w-43.5 flex-col gap-1.5 xl:w-64.5">
                <p className="text-xl font-bold xl:text-2xl">
                  Оформите карту «Северяночка»
                </p>
                <p className="text-xs xl:text-base">
                  И получайте бонусы при покупке в магазинах и на
                  сайте
                </p>
              </div>
              <Image
                src={bannerCard}
                alt="Оформите карту"
                width={220}
                height={110}
                className="absolute -top-3 -right-18.5 h-auto w-auto xl:-top-8 xl:-right-4 xl:h-auto xl:w-82.5"
              />
            </button>
            <button className="relative flex h-42.5 w-full max-w-84 cursor-pointer overflow-hidden rounded bg-[#E5FFDE] text-left duration-300 hover:shadow-(--shadow-button-default) md:max-w-88 xl:h-50 xl:max-w-146">
              {/* Баннер акций - мобильная/планшетная версия */}
              <div className="h-full w-full xl:hidden">
                <Image
                  src={bannerActionMobTab}
                  alt="Акционные товары"
                  width={353}
                  height={170}
                  className="object-content h-full w-full rounded"
                  priority
                />
              </div>

              {/* Баннер акций - десктопная версия */}
              <div className="hidden h-full w-full xl:block">
                <Image
                  src={bannerActionDesk}
                  alt="Акционные товары"
                  width={584}
                  height={200}
                  className="h-auto w-full rounded object-cover"
                  priority
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;

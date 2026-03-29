import Image from 'next/image';
import iconHeart from '../../public/icons-header/icon-heart.svg';
import { ProductCardProps } from '@/types/product';
import { formatPrice } from '@/utils/formatPrice';

const cardDiscountPercent = 6;

const ProductCard = ({
  img,
  description,
  basePrice,
  discountPercent,
  rating,
}: ProductCardProps) => {
  const calculateFinalPrice = (
    price: number,
    discount: number
  ): number => {
    return discount > 0 ? price * (1 - discount / 100) : price;
  };

  const calculatePriceByCard = (
    price: number,
    discount: number
  ): number => {
    return calculateFinalPrice(price, discount);
  };

  const finalPrice = calculateFinalPrice(basePrice, discountPercent);
  const priceByCard = calculatePriceByCard(
    finalPrice,
    cardDiscountPercent
  );

  return (
    <div className="flex w-40 flex-col justify-between overflow-hidden rounded bg-white p-0 align-top duration-300 hover:shadow-(--shadow-article) md:w-56 xl:w-68">
      <div className="relative h-40 w-40 md:w-56 xl:w-68">
        <Image
          src={img}
          alt="Акция"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 160px, (max-width: 1200px) 224px, 272px"
        />
        <button className="absolute top-2 right-2 h-8 w-8 cursor-pointer rounded bg-[#f3f2f1] p-2 opacity-50 duration-300 hover:bg-[#fcd5ba]">
          <Image
            src={iconHeart}
            alt="В избранное"
            width={24}
            height={24}
            sizes="24px"
          />
        </button>
        {discountPercent && (
          <div className="absolute bottom-2.5 left-2.5 rounded bg-[#ff6633] px-2 py-1 text-white">
            -{discountPercent}%
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between gap-y-2 p-2">
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-col gap-x-1">
            <div className="flex flex-row gap-x-1 text-sm font-bold md:text-lg">
              <span>{formatPrice(priceByCard)}</span>
              <span>₽</span>
            </div>
            {cardDiscountPercent > 0 && (
              <p className="text-[8px] text-[#bfbfbf] md:text-xs">
                С картой
              </p>
            )}
          </div>
          {finalPrice !== basePrice && cardDiscountPercent > 0 && (
            <div className="flex flex-col gap-x-1">
              <div className="flex flex-row gap-x-1 text-xs text-[#606060] md:text-base">
                <span>{formatPrice(finalPrice)}</span>
                <span>₽</span>
              </div>
              <p className="text-[8px] text-[#bfbfbf] md:text-xs">
                Обычная
              </p>
            </div>
          )}
        </div>
        <div className="line-clamp-3 h-13.5 text-xs leading-normal text-[#414141] md:line-clamp-2 md:text-base">
          {description}
        </div>
        {rating > 0 && <p>Рейтинг {rating}</p>}
        <button className="h-10 w-full cursor-pointer items-center justify-center rounded border border-(--color-primary) p-2 text-(--color-primary) transition-all duration-300 select-none hover:border-transparent hover:bg-[#ff6633] hover:text-white active:shadow-(--shadow-button-active)">
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

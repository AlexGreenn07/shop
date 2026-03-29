import Image from 'next/image';
import iconRight from '../../public/icons-header/icon-arrow-right.svg';
import ProductCard from './ProductCard';
import database from '@/data/database.json';

const Actions = () => {
  const actionProducts = database.products.filter((product) =>
    product.categories.includes('actions')
  );
  return (
    <section>
      <div className="flex flex-col justify-center xl:max-w-302">
        <div className="mb-4 flex flex-row justify-between md:mb-8 xl:mb-10">
          <h2 className="text-left text-2xl font-bold xl:text-4xl">
            Акции
          </h2>
          <button className="flex cursor-pointer flex-row items-center gap-x-2">
            <p className="text-center text-base text-[#606060] hover:text-[#bfbfbf]">
              Все акции
            </p>
            <Image
              src={iconRight}
              alt="К акциям"
              width={24}
              height={24}
              sizes="24px"
            />
          </button>
        </div>
        <ul className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 xl:gap-8">
          {actionProducts.slice(0, 4).map((item, index) => (
            <li
              key={item.id}
              className={`${index >= 4 ? 'hidden' : ''} ${index >= 3 ? 'md:hidden xl:block' : ''} ${index >= 4 ? 'xl:hidden' : ''}`}
            >
              <ProductCard {...item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Actions;

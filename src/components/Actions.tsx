import ProductCard from './ProductCard';
import { ProductCardProps } from '@/types/product';
import { shuffleArray } from '@/utils/shuffleArray';
import ViewAllButton from './ViewAllButton';

const Actions = async () => {
  let products: ProductCardProps[] = [];
  let error = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/api/products?category=actions`
    );
    products = await res.json();

    products = shuffleArray(products);
  } catch (err) {
    error = 'Ошибка получения акционных продуктов';
    console.error('Ошибка в компоненте Actions:', err);
  }
  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>;
  }

  return (
    <section>
      <div className="flex flex-col justify-center xl:max-w-302">
        <div className="mb-4 flex flex-row justify-between md:mb-8 xl:mb-10">
          <h2 className="text-left text-2xl font-bold text-[#414141] xl:text-4xl">
            Акции
          </h2>
          <ViewAllButton btnText="Все акции" href="actions" />
        </div>
        <ul className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 xl:gap-8">
          {products.slice(0, 4).map((item, index) => (
            <li
              key={item._id}
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

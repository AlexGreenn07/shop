import ProductCard from '@/components/ProductCard';
import { ProductCardProps } from '@/types/product';
import { shuffleArray } from '@/utils/shuffleArray';
import ViewAllButton from '@/components/ViewAllButton';

const AllNew = async () => {
  let products: ProductCardProps[] = [];
  let error = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/api/products?category=actions`
    );
    products = await res.json();

    products = shuffleArray(products);
  } catch (err) {
    error = 'Ошибка получения всех новинок';
    console.error('Ошибка в компоненте AllNew:', err);
  }
  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>;
  }

  return (
    <section>
      <div className="mt-20 flex flex-col px-[max(12px,calc((100%-1208px)/2))] mb-10">
        <div className="mb-4 flex flex-row justify-between md:mb-8 xl:mb-10">
          <h2 className="text-left text-2xl font-bold text-[#414141] xl:text-4xl">
            Новинки
          </h2>
          <ViewAllButton btnText="На главную" href="/" />
        </div>
        <ul className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 xl:gap-8">
          {products.map((item) => (
            <li key={item._id}>
              <ProductCard {...item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AllNew;

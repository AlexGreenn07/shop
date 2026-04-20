import { shuffleArray } from '@/utils/shuffleArray';
import fetchProductsByCategory from './fetchProducts';
import ProductsSection from './ProductsSection';

const Actions = async () => {
  let products = await fetchProductsByCategory('actions').catch(
    () => null
  );
  if (!products || products.length === 0) {
    return (
      <div className="text-red-500">
        Ошибка: не удалось загрузить акции
      </div>
    );
  }
  products = shuffleArray(products);

  return (
    <ProductsSection
      title="Акции"
      viewAllButton={{ text: 'Все акции', href: '/actions' }}
      products={products}
      compact
    />
  );
};

export default Actions;

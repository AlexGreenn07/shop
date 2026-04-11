import fetchProductsByCategory from './fetchProducts';
import ProductsSection from './ProductsSection';

const Actions = async () => {
  const products = await fetchProductsByCategory('actions').catch(
    () => null
  );

  if (!products || products.length === 0) {
    return (
      <div className="text-red-500">
        Ошибка: не удалось загрузить акции
      </div>
    );
  }

  return (
    <ProductsSection
      title="Акции"
      viewAllButton={{ text: 'Все акции', href: 'actions' }}
      products={products}
      compact
    />
  );
};

export default Actions;

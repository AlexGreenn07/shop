import fetchProductsByCategory from '../fetchProducts';
import ProductsSection from '../ProductsSection';

export const metadata = {
  title: 'Акции магазина "Северяночка"',
  description: 'Акционные товары магазина "Северяночка"',
};

const AllActions = async () => {
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
      title="Все акции"
      viewAllButton={{ text: 'На главную', href: '/' }}
      products={products}
    />
  );
};

export default AllActions;

import fetchProductsByCategory from '../fetchProducts';
import ProductsSection from '../ProductsSection';

export const metadata = {
  title: 'Новинки магазина "Северяночка"',
  description: 'Новые товары магазина "Северяночка"',
};

const AllNew = async () => {
  const products = await fetchProductsByCategory('actions').catch(
    () => null
  );
  if (!products || products.length === 0)
    return (
      <div className="text-red-500">
        Ошибка: не удалось загрузить новинки
      </div>
    );

  return (
    <ProductsSection
      title="Все новинки"
      viewAllButton={{ text: 'На главную', href: '/' }}
      products={products}
    />
  );
};

export default AllNew;

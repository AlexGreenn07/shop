import fetchProductsByCategory from './fetchProducts';
import ProductsSection from './ProductsSection';

const NewProducts = async () => {
  const products = await fetchProductsByCategory('new').catch(
    () => null
  );
  if (!products || products.length === 0) {
    return (
      <div className="text-red-500">
        Ошибка: не удалось загрузить новинки
      </div>
    );
  }

  return (
    <ProductsSection
      title="Новинки"
      viewAllButton={{ text: 'Все новинки', href: 'new' }}
      products={products}
      compact
    />
  );
};

export default NewProducts;

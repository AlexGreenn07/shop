import fetchPurchases from './fetchPurchases';
import ProductsSection from '../(products)/ProductsSection';

const Purchases = async () => {
  const purchases = await fetchPurchases().catch(() => null);
  if (!purchases || purchases.length === 0) {
    return (
      <div className="text-red-500">
        Ошибка: не удалось загрузить покупки
      </div>
    );
  }

  return (
    <ProductsSection
      title="Покупали раньше"
      viewAllButton={{ text: 'Все покупки', href: 'purchases' }}
      products={purchases}
      compact
    />
  );
};

export default Purchases;

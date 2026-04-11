import fetchPurchases from '../fetchPurchases';
import ProductsSection from '@/app/(products)/ProductsSection';

const AllPurchases = async () => {
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
      title="Все покупки"
      viewAllButton={{ text: 'На главную', href: '/' }}
      products={purchases}
    />
  );
};

export default AllPurchases;

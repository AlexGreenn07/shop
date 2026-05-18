import fetchPurchases from './fetchPurchases';
import { CONFIG } from '../../../config/config';
import ErrorComponent from '@/components/ErrorComponent';
import ProductsSection from '../(products)/ProductsSection';

const Purchases = async () => {
  try {
    const { items } = await fetchPurchases({
      userPurchasesLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
    });

    return (
      // eslint-disable-next-line react-hooks/error-boundaries
      <ProductsSection
        title="Покупали раньше"
        viewAllButton={{ text: 'Все покупки', href: 'purchases' }}
        products={items}
      />
    );
  } catch (error) {
    return (
      <ErrorComponent
        error={
          error instanceof Error ? error : new Error(String(error))
        }
        userMessage="Не удалось загрузить Ваши покупки"
      />
    );
  }
};

export default Purchases;

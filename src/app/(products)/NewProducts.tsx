import fetchProductsByTag from './fetchProducts';
import { CONFIG } from '../../../config/config';
import ErrorComponent from '@/components/ErrorComponent';
import ProductsSection from './ProductsSection';

const NewProducts = async () => {
  try {
    const { items } = await fetchProductsByTag('new', {
      randomLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
    });
    return (
      // eslint-disable-next-line react-hooks/error-boundaries
      <ProductsSection
        title="Новинки"
        viewAllButton={{ text: 'Все новинки', href: 'new' }}
        products={items}
      />
    );
  } catch (error) {
    return (
      <ErrorComponent
        error={
          error instanceof Error ? error : new Error(String(error))
        }
        userMessage="Не удалось загрузить новинки"
      />
    );
  }
};

export default NewProducts;

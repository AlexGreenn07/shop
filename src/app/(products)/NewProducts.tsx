import fetchProductsByCategory from './fetchProducts';
import ProductsSection from './ProductsSection';
import { CONFIG } from '../../../config/config';

const NewProducts = async () => {
  const { items } = await fetchProductsByCategory('new', {
    randomLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
  });

  return (
    <ProductsSection
      title="Новинки"
      viewAllButton={{ text: 'Все новинки', href: '/new' }}
      products={items}
    />
  );
};

export default NewProducts;

import ProductCard from '@/components/ProductCard';
import ViewAllButton from '@/components/ViewAllButton';
import { ProductsSectionProps } from '@/types/productsSection';

const ProductsSection = ({
  title,
  viewAllButton,
  products,
  applyIndexStyles = true,
  contentType,
}: ProductsSectionProps & {
  applyIndexStyles?: boolean;
  contentType?: string;
}) => {
  const gridClasses =
    contentType === 'category'
      ? 'grid-cols-2 md:grid-cols-3'
      : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4';
  return (
    <section>
      <div
        className={`align-center flex flex-col justify-center px-[max(12px,calc((100%-1208px)/2))]`}
      >
        <div className="mb-4 flex flex-row justify-between md:mb-8 xl:mb-10">
          <h2 className="text-left text-2xl font-bold text-[#414141] xl:text-4xl">
            {title}
          </h2>
          {viewAllButton && (
            <ViewAllButton
              btnText={viewAllButton.text}
              href={viewAllButton.href}
            />
          )}
        </div>
        <ul
          className={`grid justify-items-center gap-4 md:gap-6 xl:gap-8 ${gridClasses}`}
        >
          {products.map((item, index) => (
            <li
              key={item._id}
              className={`${applyIndexStyles ? (index >= 3 ? 'md:hidden xl:block' : '') : ''}`}
            >
              <ProductCard {...item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductsSection;

import ProductCard from '@/components/ProductCard';
import ViewAllButton from '@/components/ViewAllButton';
import { ProductsSectionProps } from '@/types/productsSection';

const ProductsSection = ({
  title,
  viewAllButton,
  products,
}: ProductsSectionProps) => {
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
        <ul className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 xl:gap-8">
          {products.map((item, index) => (
            <li
              key={item._id}
              className={`${index >= 3 ? 'md:hidden xl:block' : ''}`}
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

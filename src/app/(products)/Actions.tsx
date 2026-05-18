import fetchProductsByTag from "./fetchProducts";
import { CONFIG } from "../../../config/config";
import ErrorComponent from "@/components/ErrorComponent";
import ProductsSection from "./ProductsSection";

const Actions = async () => {
  try {
    const { items } = await fetchProductsByTag("actions", {
      randomLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
    });

    return (
      // eslint-disable-next-line react-hooks/error-boundaries
      <ProductsSection
        title="Акции"
        viewAllButton={{ text: "Все акции", href: "actions" }}
        products={items}
      />
    );
  } catch (error) {
    return (
      <ErrorComponent
        error={error instanceof Error ? error : new Error(String(error))}
        userMessage="Не удалось загрузить акции"
      />
    );
  }
};

export default Actions;
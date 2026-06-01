export interface PriceCategoryProps {
  basePath: string;
  category: string;
  setIsFilterOpenAction?: (state: boolean) => void;
}
export type PriceRange = {
  min: number;
  max: number;
};

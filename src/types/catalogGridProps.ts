import { CatalogProps } from './catalogProps';

export interface CatalogGridProps {
  categories: CatalogProps[];
  isEditing: boolean;
  hoveredCategoryId: string | null;
  draggedCategory: CatalogProps | null;
  onDragOverAction: (e: React.DragEvent, categoryId: string) => void;
  onDropAction: (
    e: React.DragEvent,
    targetCategoryId: string
  ) => void;
  onDragLeaveAction: () => void;
  onDragStartAction: (category: CatalogProps) => void;
}

import { CatalogAdminControlsProps } from '@/types/catalogAdminControlsProps';

function CatalogAdminControls({
  isEditing,
  onToggleEditingAction,
  onResetLayoutAction,
}: CatalogAdminControlsProps) {
  return (
    <div className="mb-4 flex justify-end">
      <button
        onClick={onToggleEditingAction}
        className="h-10 w-2/3 cursor-pointer items-center justify-center rounded border border-(--color-primary) p-2 text-sm text-(--color-primary) transition-all duration-300 select-none hover:border-transparent hover:bg-[#ff6633] hover:text-white active:shadow-(--shadow-button-active) md:text-base"
      >
        {isEditing
          ? 'Закончить редактирование'
          : 'Изменить расположение'}
      </button>
      {isEditing && (
        <button
          onClick={onResetLayoutAction}
          className="ml-3 cursor-pointer items-center justify-center rounded border-none bg-[#f3f2f1] p-2 text-xs transition-colors duration-300 hover:shadow-(--shadow-button-secondary) active:shadow-(--shadow-button-active)"
        >
          Сбросить
        </button>
      )}
    </div>
  );
}

export default CatalogAdminControls;

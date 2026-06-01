'use client';
interface PriceFilterHeaderProps {
  onResetAction: () => void;
}
function PriceFilterHeader({
  onResetAction,
}: PriceFilterHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <p className="text-base text-black">Цена</p>
      <button
        type="button"
        onClick={onResetAction}
        className="h-8 cursor-pointer rounded bg-[#f3f2f1] p-2 text-xs duration-300 hover:bg-(--color-primary) hover:text-white hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active)"
      >
        Очистить
      </button>
    </div>
  );
}

export default PriceFilterHeader;

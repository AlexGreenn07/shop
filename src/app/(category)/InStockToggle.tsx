'use client';

interface InStockToggleProps {
  inStock: boolean;
  onChangeAction: (inStock: boolean) => void;
}
function InStockToggle({
  inStock,
  onChangeAction,
}: InStockToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          id="inStock"
          checked={inStock}
          onChange={(e) => onChangeAction(e.target.checked)}
          className="peer sr-only"
        />
        <div className="peer peer-checked:bg-primary h-6 w-11.5 rounded-full bg-gray-200 transition-colors duration-200">
          <div
            className={`absolute top-0.5 left-0 h-5 w-5 rounded-full border-[0.5px] border-[rgba(0,0,0,0.04)] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.08),0px_2px_6px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
              inStock
                ? 'translate-x-6 transform'
                : 'translate-x-0 transform'
            } `}
          ></div>
        </div>
        <span className="text-main-text ml-2 text-sm">В наличии</span>
      </label>
    </div>
  );
}

export default InStockToggle;

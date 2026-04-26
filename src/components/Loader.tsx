interface LoaderProps {
  text?: string;
  className?: string;
}

export const Loader = ({
  text = '',
  className = '',
}: LoaderProps) => (
  <div
    className={`flex flex-col items-center justify-center gap-3 ${className}`}
  >
    <div className="relative h-12 w-12">
      <div className="absolute h-full w-full animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      <div className="animate-spin-reverse absolute h-full w-full rounded-full border-4 border-orange-500 border-b-transparent"></div>
    </div>
    {text && (
      <p className="text-(--color-primary)">Загрузка {text}...</p>
    )}
  </div>
);

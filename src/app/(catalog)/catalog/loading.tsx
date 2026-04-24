export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6">
      {/* Анимированная иконка */}
      <div className="relative h-20 w-20">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 h-full w-full animate-spin rounded-full border-4 border-[#ff6633] border-t-transparent border-r-transparent"
            style={{
              animationDuration: `${1 + i * 0.5}s`,
              opacity: 1 - i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Текст с пульсацией */}
      <div className="space-y-2 text-center">
        <p className="animate-pulse text-xl font-medium text-gray-700">
          Загружаем каталог
        </p>
        <p className="text-sm text-gray-500">
          Это займет всего несколько секунд
        </p>
      </div>

      {/* Прогресс-бар (опционально) */}
      <div className="mt-4 h-2 w-64 overflow-hidden rounded-full bg-gray-200">
        <div
          className="animate-progress h-full rounded-full bg-[#ff6633]"
          style={{
            width: '0%',
            animation: 'progress 2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

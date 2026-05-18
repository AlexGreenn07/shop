const MiniLoader = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex space-x-2">
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
          style={{ animationDelay: '0ms' }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
          style={{ animationDelay: '150ms' }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
};

export default MiniLoader;

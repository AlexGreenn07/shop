import CloseButton from './CloseButton';

type AuthFormVariant = 'register' | 'default';

export const AuthFormLayout = ({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: AuthFormVariant;
}) => {
  return (
    <div className="text-main-text absolute inset-0 z-100 flex min-h-screen items-center justify-center bg-[#fcd5bacc] px-3 py-10 backdrop-blur-sm">
      <div
        className={`${variant === 'register' ? 'max-w-171.75' : 'max-w-105'} relative m-4 flex max-h-[calc(100vh-80px)] w-full flex-col rounded bg-white px-6 shadow-(--shadow-auth-form)`}
      >
        <CloseButton />
        <div className="flex-1 overflow-y-auto pt-18 pb-10">
          {children}
        </div>
      </div>
    </div>
  );
};

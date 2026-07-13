import { tableStyles } from '@/app/(admin)/styles';

const Register = ({ createdAt }: { createdAt: string }) => {
  return (
    <div
      className={`order-7 flex flex-row gap-x-2 gap-y-1 border-r border-b border-gray-300 md:flex-row md:border-r-0 md:border-b-0 ${tableStyles.colSpans.registration} ${tableStyles.border.bottom}`}
    >
      <div className="text-xs font-semibold md:hidden">
        Регистрация:
      </div>
      <div className="text-xs">
        {new Date(createdAt).toLocaleDateString('ru-RU')}
      </div>
      <div className="text-xs text-gray-400">
        {new Date(createdAt).toLocaleTimeString('ru-RU')}
      </div>
    </div>
  );
};

export default Register;

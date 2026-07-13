import { buttonStyles } from '@/app/(auth)/styles';
import Link from 'next/link';

function AdminPanel() {
  return (
    <div className="p-6">
      <h1 className="text-main-text m-6 text-2xl font-bold">
        Панель управления
      </h1>
      <div className="grid gap-4">
        <Link
          href="/administrator/users-list"
          className={`${buttonStyles.active} w-full px-4 py-2 md:w-1/2 [&&]:justify-start`}
        >
          Управление пользователями
        </Link>
      </div>
    </div>
  );
}

export default AdminPanel;

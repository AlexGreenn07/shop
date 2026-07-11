'use client';

import { useAuthStore } from '@/store/authStore';
import { buttonStyles } from '@/app/(auth)/styles';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteAccountModal from './DeleteAccountModal';

const SecuritySection: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const logoutFromProfile = () => {
    router.push('/');
  };

  const handleAppLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      setError('Не удалось выйти из приложения');
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    if (user.phoneNumberVerified) {
      router.push('/verify-delete-phone');
    } else {
      router.push('/verify-delete-email');
    }
  };

  const handleOpenDeleteModal = () => {
    setError(null);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteModal = () => {
    setError(null);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="border-t pt-8">
        <h2 className="mb-6 text-2xl font-bold text-[#414141]">
          Безопасность
        </h2>
        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-100 p-3 text-[#d80000]">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <button
            onClick={logoutFromProfile}
            className={`${buttonStyles.active} hover:shadow-button-cancel active:shadow-button-cancel-active flex h-12 flex-1 cursor-pointer items-center justify-center rounded bg-[#f3f2f1] px-4 py-2 font-medium text-[#606060] duration-300`}
          >
            Выйти из личного кабинета
          </button>
          <button
            onClick={handleAppLogout}
            className="hover:shadow-button-secondary flex h-12 flex-1 cursor-pointer items-center justify-center rounded border-none bg-[#f3f2f1] px-4 py-2 font-medium text-[#606060] duration-300 active:shadow-(--shadow-button-active) disabled:cursor-not-allowed disabled:opacity-50"
          >
            Выйти из приложения
          </button>
          <button
            onClick={handleOpenDeleteModal}
            className="h-12 cursor-pointer rounded bg-[#ffc7c7] px-4 py-2 text-center font-medium text-[#d80000] duration-300 hover:bg-[#d80000] hover:text-[#f2f2f2]"
          >
            Удалить аккаунт
          </button>
        </div>
      </div>
      <DeleteAccountModal
        isOpen={showDeleteConfirm}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
        error={error}
      />
    </>
  );
};

export default SecuritySection;

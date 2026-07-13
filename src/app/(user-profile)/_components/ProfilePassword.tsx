import { useAuthStore } from '@/store/authStore';
import { formStyles, profileStyles } from '@/app/(auth)/styles';
import { Key, ArrowRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ProfilePassword = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isPhoneRegistered = user?.phoneNumberVerified === true;

  const handlePasswordChangeClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);

    await logout();

    if (isPhoneRegistered) {
      router.replace('/phone-pass-reset');
    } else {
      router.replace('/forgot-password');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getModalText = () => {
    return isPhoneRegistered
      ? 'Для смены пароля будет использована SMS-верификация. Вы будете выведены из аккаунта. Продолжить?'
      : 'Для смены пароля будет отправлено письмо с инструкциями на Ваш email. Вы будете выведены из аккаунта. Продолжить?';
  };

  return (
    <div className="mb-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h3 className={profileStyles.sectionTitle}>Пароль</h3>

        <button
          onClick={handlePasswordChangeClick}
          className={profileStyles.editButton}
        >
          Сменить пароль
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      <div className={profileStyles.inputContainer}>
        <input
          type="text"
          value="********"
          className={`${formStyles.input} disabled:cursor-not-allowed [&&]:w-full [&&]:disabled:bg-[#f3f2f1]`}
          disabled
          readOnly
        />
        <Key className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="text-main-text absolute inset-0 z-100 flex min-h-screen items-center justify-center bg-[#fcd5bacc] px-3 py-10 backdrop-blur-sm">
          <div className="shadow-auth-form) relative flex max-h-[calc(100vh-80px)] w-full flex-col rounded bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Подтверждение смены пароля
              </h3>
              <button
                onClick={handleCancel}
                className="cursor-pointer rounded-full p-1 text-gray-400 duration-300 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-6 text-gray-600">{getModalText()}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className={profileStyles.cancelButton}
              >
                Отмена
              </button>
              <button
                onClick={handleConfirm}
                className={profileStyles.saveButton}
              >
                Продолжить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePassword;

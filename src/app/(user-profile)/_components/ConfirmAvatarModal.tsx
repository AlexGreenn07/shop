'use client';
import Image from 'next/image';
interface ConfirmAvatarModalProps {
  isOpen: boolean;
  previewUrl: string;
  isUploading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
function ConfirmAvatarModal({
  isOpen,
  previewUrl,
  isUploading,
  onConfirm,
  onCancel,
}: ConfirmAvatarModalProps) {
  if (!isOpen) return null;
  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm rounded bg-white p-6">
        <h3 className="mb-4 text-center text-lg font-semibold">
          Подтверждение смены аватара
        </h3>

        <div className="mb-4 flex justify-center">
          <Image
            src={previewUrl}
            width={80}
            height={80}
            alt="Превью аватара"
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>

        <p className="mb-6 text-center text-gray-600">
          Вы уверены, что хотите сменить аватар? Старое изображение
          будет удалено.
        </p>

        <div className="flex w-full gap-3">
          <button
            disabled={isUploading}
            onClick={onConfirm}
            className="bg-primary flex-1 cursor-pointer rounded py-2 text-white duration-300 hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? 'Загрузка' : 'Да, сменить'}
          </button>
          <button
            onClick={onCancel}
            disabled={isUploading}
            className="hover:shadow-button-secondary flex-1 cursor-pointer rounded bg-[#f3f2f1] py-2 text-[#606060] duration-300 active:shadow-(--shadow-button-active) disabled:opacity-50"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAvatarModal;

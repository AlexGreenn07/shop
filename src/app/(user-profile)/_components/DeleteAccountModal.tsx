'use client';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  error?: string | null;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fbf8ec]">
      <div className="w-96 rounded bg-white p-6">
        <h3 className="mb-4 text-xl font-bold">
          Подтверждение удаления
        </h3>

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <p className="mb-6 text-[#414141]">
          Вы уверены, что хотите удалить свой аккаунт? Это действие
          нельзя отменить.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="hover:shadow-button-secondary flex flex-1 cursor-pointer items-center justify-center rounded border-none bg-[#f3f2f1] p-2 duration-300 active:shadow-(--shadow-button-active)"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 cursor-pointer rounded bg-[#d80000] px-4 py-2 text-white duration-300 hover:bg-red-700"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;

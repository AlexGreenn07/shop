'use client';

import Image from 'next/image';

interface CameraModalProps {
  isOpen: boolean;
  isCameraReady: boolean;
  isUploading: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onClose: () => void;
  onVideoLoaded: () => void;
  onTakePhoto: () => void;
}

const CameraModal = ({
  isOpen,
  isCameraReady,
  isUploading,
  videoRef,
  canvasRef,
  onClose,
  onVideoLoaded,
  onTakePhoto,
}: CameraModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center rounded bg-black p-4">
      <div className="w-full max-w-sm rounded bg-white p-4">
        <h3 className="mb-4 text-center text-lg font-semibold">
          Сделайте фото
        </h3>

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onLoadedData={onVideoLoaded}
            className="mx-auto mb-4 h-full w-full rounded bg-gray-200"
          />
          {!isCameraReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
            </div>
          )}
        </div>

        {/* canvas используется для "фотографирования" текущего кадра видео */}
        <canvas ref={canvasRef} className="hidden" />

        <div className="flex w-full gap-3 text-xs md:text-sm">
          <button
            onClick={onTakePhoto}
            disabled={!isCameraReady || isUploading}
            className="bg-primary hover:shadow-button-default active:shadow-button-active flex-1 cursor-pointer rounded px-3 text-white duration-300 hover:bg-[#039b03] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex flex-row items-center justify-center gap-x-2 md:gap-x-4">
              <Image
                src="/icons-auth/icon-camera.png"
                alt="Фото"
                width={24}
                height={24}
              />
              {isCameraReady ? ' Снять фото' : 'Загрузка...'}
            </div>
          </button>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="hover:shadow-button-secondary active:shadow-button-active flex flex-1 cursor-pointer items-center justify-center rounded border-none bg-[#f3f2f1] p-2 duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Отмена
          </button>
        </div>

        {!isCameraReady && (
          <p className="mt-2 text-center text-xs text-gray-500">
            Камера запускается...
          </p>
        )}
      </div>
    </div>
  );
};

export default CameraModal;

import IconAvatarChange from '@/components/svg/IconAvatarChange';
import { useAuthStore } from '@/store/authStore';
import { getAvatarByGender } from '@/utils/getAvatarByGender';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ConfirmAvatarModal from './ConfirmAvatarModal';
import { useAvatar } from '@/hooks/useAvatar';
import '../styles.css';
import CameraModal from './CameraModal';
import { optimizeCameraPhoto } from '@/utils/optimizeImages/optimizeCameraPhoto';
import { optimizeImage } from '@/utils/optimizeImages/optimizeImage';

function ProfileAvatar({ gender }: { gender: string }) {
  const { user } = useAuthStore();
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [cameraStream, setCameraStream] =
    useState<MediaStream | null>(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    displayAvatar,
    isLoading: isUploading,
    uploadAvatar,
  } = useAvatar({
    userId: user?.id,
    gender,
  });

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [cameraStream, previewUrl]);

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const optimizedFile = await optimizeImage(file, 128, 0.7);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const previewUrl = event.target.result as string;
          setPreviewUrl(previewUrl);
          setPendingFile(optimizedFile);
          setShowConfirmModal(true);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Ошибка оптимизации изображения: ', error);
      alert('Не удалось обработать изображение');
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = getAvatarByGender(gender);
  };

  const handleAvatarConfirm = async () => {
    if (pendingFile) {
      setShowConfirmModal(false);
      try {
        await uploadAvatar(pendingFile);
        if (previewUrl && previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl('');
      } catch (error) {
        alert(
          error instanceof Error ? error.message : 'Ошибка загрузки'
        );
        setPreviewUrl('');
      } finally {
        setPendingFile(null);
      }
    }
  };

  const handleAvatarCancel = () => {
    setShowConfirmModal(false);
    setPendingFile(null);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      });
      setCameraStream(stream);
      setShowCameraModal(true);
      setIsCameraReady(false);
    } catch (error) {
      console.error('Ошибка доступа к камере:', error);
      alert('Не удалось получить доступ к камере');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setShowCameraModal(false);
    setIsCameraReady(false);
  };

  const handleVideoLoaded = () => {
    setIsCameraReady(true);
  };

  const takePhoto = async () => {
    if (
      videoRef.current &&
      canvasRef.current &&
      isCameraReady &&
      user?.id
    ) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) {
        alert('Ошибка создания контекста canvas');
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        const optimizedFile = await optimizeCameraPhoto(
          canvas,
          0.7,
          128,
          user.id
        );

        const previewUrl = URL.createObjectURL(optimizedFile);

        setPreviewUrl(previewUrl);
        stopCamera();
        setPendingFile(optimizedFile);
        setShowConfirmModal(true);
      } catch (error) {
        console.error('Ошибка создания фото: ', error);
        alert('Не удалось сделать фото');
      }
    } else {
      alert('Камера еще не готова. Подождите немного.');
    }
  };

  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="relative">
        <Image
          src={displayAvatar}
          width={128}
          height={128}
          alt="Аватар пользователя"
          className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
          onError={handleImageError}
          priority
        />
        {isUploading && (
          <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-full bg-black">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
          </div>
        )}
        <label className="bg-primary absolute right-0 bottom-0 cursor-pointer rounded-full p-2 text-white shadow-md duration-300 hover:bg-green-600">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileInputChange}
          />
          <IconAvatarChange />
        </label>
        <button
          onClick={startCamera}
          disabled={isUploading}
          className="shadow-article absolute -bottom-1 left-0 cursor-pointer rounded-full bg-[#ff6633] p-2 text-white duration-300 hover:bg-[#e5410a] disabled:cursor-not-allowed disabled:opacity-50"
          title="Сделать фото"
        >
          <Image
            src="/icons-auth/icon-camera.png"
            alt="Фото"
            width={24}
            height={24}
          />
        </button>
        <ConfirmAvatarModal
          isOpen={showConfirmModal}
          previewUrl={previewUrl}
          isUploading={isUploading}
          onConfirm={handleAvatarConfirm}
          onCancel={handleAvatarCancel}
        />
        <CameraModal
          isOpen={showCameraModal}
          isCameraReady={isCameraReady}
          isUploading={isUploading}
          videoRef={videoRef}
          canvasRef={canvasRef}
          onClose={stopCamera}
          onVideoLoaded={handleVideoLoaded}
          onTakePhoto={takePhoto}
        />
      </div>
      <div className="mt-3 text-center">
        <p className="mb-1 text-sm text-gray-600">
          Нажмите на иконки для смены аватара
        </p>
        <p className="text-xs text-gray-500">
          {isUploading
            ? 'Загрузка...'
            : 'Загрузить файл или сделать фото'}
        </p>
      </div>
    </div>
  );
}

export default ProfileAvatar;

export const optimizeImage = async (
  file: File,
  size: number = 128,
  quality: number = 0.7
): Promise<File> => {
  // Проверяем, что переданный файл действительно является изображением
  if (!file.type.startsWith('image/')) {
    throw new Error('Указанный файл не является изображением');
  }

  try {
    // createImageBitmap с опцией 'from-image' аппаратно считывает метаданные EXIF
    // и автоматически разворачивает фотографии со смартфонов (iOS/Android) в правильную ориентацию
    const img = await createImageBitmap(file, {
      imageOrientation: 'from-image',
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      img.close();
      throw new Error(
        'Не удалось получить контекст Canvas (2D Context)'
      );
    }

    // Устанавливаем строго квадратные размеры холста
    canvas.width = size;
    canvas.height = size;

    // Включаем алгоритмы высококачественного сглаживания,
    // чтобы при сильном уменьшении больших картинок не появлялись "зубчатые" края
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Вычисляем параметры для центрированной обрезки до квадрата
    const aspectRatio = img.width / img.height;

    let sourceX = 0;
    let sourceY = 0;
    let sourceWidth = img.width;
    let sourceHeight = img.height;

    if (aspectRatio > 1) {
      // Альбомная ориентация (ширина больше высоты) — обрезаем по бокам
      sourceWidth = img.height;
      sourceX = (img.width - sourceWidth) / 2;
    } else if (aspectRatio < 1) {
      // Портретная ориентация (высота больше ширины) — обрезаем сверху и снизу
      sourceHeight = img.width;
      sourceY = (img.height - sourceHeight) / 2;
    }

    // Очищаем canvas перед началом работы
    ctx.clearRect(0, 0, size, size);

    // ЗАЩИТА ДЛЯ PNG: Заливаем холст сплошным белым цветом.
    // Если этого не сделать, прозрачные области в PNG при конвертации в JPEG станут черными квадратами.
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Рисуем изображение поверх белого фона с учетом рассчитанных координат обрезки
    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      size,
      size
    );

    // Сразу освобождаем память от ImageBitmap в GPU/RAM, чтобы избежать утечек памяти
    img.close();

    // Экспортируем результат холста в новый файл
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Подменяем старое расширение файла на .jpg, очищая имя от прошлых точек
            const newName =
              file.name.replace(/\.[^/.]+$/, '') + '.jpg';
            resolve(
              new File([blob], newName, { type: 'image/jpeg' })
            );
          } else {
            reject(
              new Error('Не удалось создать объект Blob из Canvas')
            );
          }
        },
        'image/jpeg',
        quality
      );
    });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Произошла непредвиденная ошибка при оптимизации изображения'
    );
  }
};

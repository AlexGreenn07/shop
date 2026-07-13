'use client';

import { CatalogProps } from '@/types/catalogProps';
import { useEffect, useState } from 'react';
import ErrorComponent from '@/components/ErrorComponent';
import { Loader } from '@/components/Loader';
import CatalogAdminControls from '../CatalogAdminControls';
import CatalogGrid from '../CatalogGrid';
import { useAuthStore } from '@/store/authStore';

const CatalogPage = () => {
  const [categories, setCategories] = useState<CatalogProps[]>([]);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);
  const [draggedCategory, setDraggedCategory] =
    useState<CatalogProps | null>(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuthStore();

  const isAdmin = user?.role === 'admin';
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/catalog');
      if (!response.ok)
        throw new Error(`Ошибка ответа сервера: ${response.status}`);
      const data: CatalogProps[] = await response.json();
      setCategories(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      setError({
        error:
          error instanceof Error
            ? error
            : new Error('Неизвестная ошибка'),
        userMessage: 'Не удалось загрузить категории',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateOrderInDB = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('api/catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          categories.map((category, index) => ({
            _id: category._id,
            order: index + 1,
            title: category.title,
            img: category.img,
            mobileColSpan: category.mobileColSpan,
            tabletColSpan: category.tabletColSpan,
            colSpan: category.colSpan,
          }))
        ),
      });
      if (!response.ok)
        throw new Error('Ошибка при обновлении порядка');
      await response.json();
    } catch (error) {
      setError({
        error:
          error instanceof Error
            ? error
            : new Error('Неизвестная ошибка'),
        userMessage: 'Не удалось сохранить порядок категорий',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleEditing = async () => {
    if (isEditing) {
      await updateOrderInDB();
    }
    setIsEditing(!isEditing);
  };
  const handleDragStart = (category: CatalogProps) => {
    if (isEditing) {
      setDraggedCategory(category);
    }
  };
  const handleDragOver = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    if (draggedCategory && draggedCategory._id !== categoryId) {
      setHoveredCategoryId(categoryId);
    }
  };
  const handleDrop = (
    e: React.DragEvent,
    targetCategoryId: string
  ) => {
    e.preventDefault();
    if (!isEditing || !draggedCategory) return;
    setCategories((prevCategories) => {
      const draggedIndex = prevCategories.findIndex(
        (c) => c._id === draggedCategory._id
      );
      const targetIndex = prevCategories.findIndex(
        (c) => c._id === targetCategoryId
      );
      if (draggedIndex === -1 || targetIndex === -1)
        return prevCategories;

      const newCategories = [...prevCategories];
      const draggedItem = newCategories[draggedIndex];
      const targetItem = newCategories[targetIndex];
      const draggedSizes = {
        mobileColSpan: draggedItem.mobileColSpan,
        tabletColSpan: draggedItem.tabletColSpan,
        colSpan: draggedItem.colSpan,
      };
      const targetSizes = {
        mobileColSpan: targetItem.mobileColSpan,
        tabletColSpan: targetItem.tabletColSpan,
        colSpan: targetItem.colSpan,
      };

      newCategories[draggedIndex] = {
        ...targetItem,
        ...draggedSizes,
      };
      newCategories[targetIndex] = { ...draggedItem, ...targetSizes };

      return newCategories;
    });
    setHoveredCategoryId(null);
    setDraggedCategory(null);
  };
  const handleDragLeave = () => {
    setHoveredCategoryId(null);
  };

  const resetLayout = () => {
    fetchCategories();
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <ErrorComponent
        error={error.error}
        userMessage={error.userMessage}
      />
    );
  }
  if (!categories.length) {
    return (
      <div className="text-grey-500 py-8 text-center">
        Категорий каталога не найдено
      </div>
    );
  }

  return (
    <section className="mx-auto px-[max(12px,calc((100%-1208px)/2))]">
      {!isAdmin && (
        <CatalogAdminControls
          isEditing={isEditing}
          onToggleEditingAction={handleToggleEditing}
          onResetLayoutAction={resetLayout}
        />
      )}
      <h1 className="mb:text-5xl text-main-text mb-4 flex flex-row text-4xl font-bold md:mb-8 xl:mb-10 xl:text-[64px]">
        Каталог
      </h1>
      <CatalogGrid
        categories={categories}
        isEditing={isEditing}
        hoveredCategoryId={hoveredCategoryId}
        draggedCategory={draggedCategory}
        onDragOverAction={handleDragOver}
        onDropAction={handleDrop}
        onDragLeaveAction={handleDragLeave}
        onDragStartAction={handleDragStart}
      />
    </section>
  );
};

export default CatalogPage;

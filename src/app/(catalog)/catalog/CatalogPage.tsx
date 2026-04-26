'use client';

import { CatalogProps } from '@/types/catalog';
import { useEffect, useState } from 'react';
import GridCategoryBlock from './GridCategoryBlock';
import Loading from './loading';

const CatalogPage = () => {
  const [categories, setCategories] = useState<CatalogProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [draggedCategory, setDraggedCategory] =
    useState<CatalogProps | null>(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const isAdmin = true;
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/catalog');
      if (!response.ok)
        throw new Error(`Ошибка ответа сервера: ${response.status}`);
      const data: CatalogProps[] = await response.json();
      setCategories(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Не удалось получить категории:', error);
      setError('Не удалось получить категории');
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
      console.log('Ошибка при сохранении порядка:', error);
      setError('Ошибка при сохранении порядка');
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
    return <Loading />;
  }
  if (error) {
    throw error;
  }
  if (!categories.length) {
    return (
      <div className="text-grey-500 py-8 text-center">
        Категорий каталога не найдено
      </div>
    );
  }

  return (
    <section className="mx-auto mb-20 px-[max(12px,calc((100%-1208px)/2))]">
      {isAdmin && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleToggleEditing}
            className="h-10 w-1/2 cursor-pointer items-center justify-center rounded border border-(--color-primary) p-2 text-(--color-primary) transition-all duration-300 select-none hover:border-transparent hover:bg-[#ff6633] hover:text-white active:shadow-(--shadow-button-active)"
          >
            {isEditing
              ? 'Закончить редактирование'
              : 'Изменить расположение'}
          </button>
          {isEditing && (
            <button
              onClick={resetLayout}
              className="ml-3 cursor-pointer items-center justify-center rounded border-none bg-[#f3f2f1] p-2 text-xs transition-colors duration-300 hover:shadow-(--shadow-button-secondary) active:shadow-(--shadow-button-active)"
            >
              Сбросить
            </button>
          )}
        </div>
      )}
      <h1 className="mb:text-5xl mb-4 flex flex-row text-4xl font-bold text-[#414141] md:mb-8 xl:mb-10 xl:text-[64px]">
        Каталог
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 xl:gap-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`${category.mobileColSpan} ${category.tabletColSpan} ${category.colSpan} h-full min-h-50 overflow-hidden rounded bg-gray-100 ${isEditing ? 'border-4 border-dashed border-gray-400' : ''} ${hoveredCategoryId === category._id ? 'border-4 border-dashed border-red-400' : ''} `}
            onDragOver={(e) => handleDragOver(e, category._id)}
            onDrop={(e) => handleDrop(e, category._id)}
            onDragLeave={handleDragLeave}
          >
            <div
              className={`h-full w-full ${draggedCategory?._id === category._id ? 'opacity-50' : ' '}`}
              draggable={isEditing}
              onDragStart={() => handleDragStart(category)}
            >
              <GridCategoryBlock
                id={category.id}
                title={category.title}
                img={category.img}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CatalogPage;

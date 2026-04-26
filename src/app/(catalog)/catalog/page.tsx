import { Suspense } from 'react';
import CatalogPage from './CatalogPage';
import { Loader } from '@/components/Loader';

export const metadata = {
  title: 'Каталог товаров магазина "Северяночка"',
  description: 'Каталог всех товаров магазина "Северяночка"',
};

export default function Catalog() {
  return (
    <Suspense fallback={<Loader text="каталога" />}>
      <CatalogPage />
    </Suspense>
  );
}

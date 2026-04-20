'use client';

import { usePathname } from 'next/navigation';

const BreadCrumbs = () => {
  const pathname = usePathname();
  return <div>BreadCrumbs</div>;
};

export default BreadCrumbs;

const ProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  let productId: string = '';
  try {
    productId = (await params).id;
  } catch (error) {
    console.error('Ошибка получения продукта:', error);
  }
  return <div>Страница продукта: {productId}</div>;
};

export default ProductPage;

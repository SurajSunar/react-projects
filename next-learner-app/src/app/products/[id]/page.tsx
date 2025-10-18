const getProduct = async (
  id: number
): Promise<{
  id: number;
  name: string;
  desc: string;
  price: number;
}> => {
  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        resolve({ id, name: "Mobile XP", desc: "Latest mobile", price: 1200 }),
      2000
    )
  );
};

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const product = await getProduct(+id);

  return (
    <div>
      <p>{product.id}</p>
      <p>{product.name}</p>
      <p>{product.desc}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductDetail;

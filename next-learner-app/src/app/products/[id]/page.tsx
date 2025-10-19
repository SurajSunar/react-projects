import { title } from "process";


export const generateMetadata =  async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

  return {
    title: `product-${id}`,
    description: `This will describe for product ID - ${id}`
  }
}


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
      3000
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

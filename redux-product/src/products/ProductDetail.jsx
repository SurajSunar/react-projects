import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const product = useSelector((state) => state.productStore?.product);
  const navigate = useNavigate();

  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  });
  return (
    <div className="w-1/2 mx-auto bg-amber-100 flex flex-col justify-center items-center gap-4 p-4">
      <h1 className="font-semibold text-2xl">Product Details</h1>
      <img src={product?.image}></img>
      <h1 className="text-xl border-t w-full pt-2">{product?.title}</h1>
      <p className="text-sm text-gray-900">{product?.description}</p>
      <button className="bg-amber-300 p-2 w-full font-semibold">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;

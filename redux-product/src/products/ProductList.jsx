import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("https://fakestoreapi.com/products");
      const products = await data.json();
      setProducts(products);
    }

    fetchData();
  }, []);

  const viewProduct = (product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-2xl text-center py-6">Product List</h1>
      <div className="w-10/12 mx-auto">
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div className="flex flex-col justify-between gap-2 border rounded-2xl p-2">
              <img
                src={product.image}
                className="w-full h-[250px] object-cover"
              ></img>
              <h1 className="text-lg font-semibold">{product.title}</h1>
              <p className="text-sm">{product.description}</p>
              <p>Nu. {product.price}</p>
              <button
                onClick={() => viewProduct(product)}
                className="w-full bg-green-500 p-4 rounded cursor-pointer"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

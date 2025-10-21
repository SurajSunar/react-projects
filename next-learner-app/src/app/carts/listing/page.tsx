"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

const CartListPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://dummyjson.com/carts").then((res) => res.json()),
  });

  if (isPending) {
    return <div>Loading carts...</div>;
  }

  return (
    <div className="flex flex-col gap-6 m-2 ">
      {data.carts.map((cart: any) => (
        <div className="flex flex-col gap-4 bg-cyan-200  p-4 rounded-xl">
          <h1>totalProducts: {cart.totalProducts}</h1>
          <h1>totalQuantity: {cart.totalQuantity}</h1>
          <div className="flex gap-4">
            Product:{" "}
            {cart.products.map((product) => (
              <div>
                {product.title} - {product.price}
              </div>
            ))}{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartListPage;

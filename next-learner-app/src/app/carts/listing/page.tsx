"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

const CartListPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://dummyjson.com/carts").then((res) => res.json()),
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: () => {
      return fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        body: JSON.stringify({
          userId: 1,
          products: [
            {
              id: 144,
              quantity: 4,
            },
            {
              id: 98,
              quantity: 1,
            },
          ],
        }),
      });
    },
    onSuccess: () => {
      toast.success("Added to cart");
    },
    onError: () => {
      toast.error("Error in adding to cart");
    },
  });

  if (isPending) {
    return <div>Loading carts...</div>;
  }

  return (
    <div className="flex flex-col gap-6 m-2 ">
      <button
        className="border border-gray-200 py-2 px-4 w-fit"
        onClick={() => {
          mutation.mutate();
        }}
      >
        Add Product
      </button>
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
      <ToastContainer />
    </div>
  );
};

export default CartListPage;

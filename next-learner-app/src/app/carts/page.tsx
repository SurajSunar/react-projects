"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import CartListPage from "./listing/page";

const queryClient = new QueryClient();

const CartsPage = () => {
  return (
    <div>
      2323
      <QueryClientProvider client={queryClient}>
        <CartListPage />
      </QueryClientProvider>
    </div>
  );
};

export default CartsPage;

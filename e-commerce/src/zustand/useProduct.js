import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { httpRequest } from "../lib/httprequest";

export const useProduct = create(
  persist(
    (set, get) => ({
      products: null,
      addProduct: async (payload) => {
        try {
          const res = await httpRequest.post("/products", {
            ...payload,
          });
          set({
            ...res,
          });
        } catch (error) {
          console.log(error);
        }
      },
      updateProduct: async (payload) => {
        try {
          const res = await httpRequest.put("/products/" + payload.id, {
            ...payload,
          });
          set({
            ...res,
          });
        } catch (error) {
          console.log(error);
        }
      },

      deleteProduct: async (id) => {
        try {
          const res = await httpRequest.delete("/products/" + id);
          set({
            ...res,
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "auth",
    }
  )
);

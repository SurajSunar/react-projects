import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const useProduct = create(
  persist(
    (set, get) => ({
      products: null,
      addProduct: async (payload, user) => {
        try {
          const res = await axios.post(
            "/products",
            {
              ...payload,
            },
            {
              headers: {
                Authorization: "Bearer " + user.accessToken,
              },
            }
          );
          set({
            ...res,
          });
        } catch (error) {
          console.log(error);
        }
      },

      deleteUser: async (id) => {
        try {
          const user = get().user;
          const res = await axios.delete("/users/" + id, {
            headers: {
              Authorization: "Bearer " + user.accessToken,
            },
          });
          set({
            ...res,
          });
        } catch (error) {
          console.log(error);
        }
      },
      login: async (state) => {
        try {
          const res = await axios.post("/login", {
            ...state,
          });
          if (res.status === 200) {
            const { user } = res.data;
            set({ ...res.data });
            window.location.replace(
              user.role === "admin" ? "/admin/dashboard" : "/"
            );
          } else {
            toast.error("Wrong username or password!");
          }
        } catch (error) {
          set({
            user: null,
          });
          toast.error(error?.response?.data?.message);
        }
      },
      logout: () => {
        set({
          user: null,
        });
        window.location.href = "/login";
      },
    }),
    {
      name: "auth",
    }
  )
);

import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      signup: async (payload) => {
        try {
          const res = await axios.post("/signup", {
            ...payload,
          });
          set({
            ...res,
          });
          window.location.replace("/admin/dashboard");
        } catch (error) {
          console.log(error);
        }
      },
      updateUser: async (payload) => {
        try {
          const res = await axios.put("/users" / +payload.id, {
            ...payload,
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

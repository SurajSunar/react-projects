import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set, get) => ({
      user: null,
      signup: async (state) => {
        try {
          set({
            user: {
              token: "1234",
            },
          });
          window.location.replace("/admin/dashboard");
        } catch (error) {
          console.log(error);
        }
      },
      login: async (state) => {
        try {
          const res = await axios.post("http://localhost:3000/login", {
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

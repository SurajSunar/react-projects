import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      login: async (state) => {
        try {
          if (
            state.email === "admin@gmail.com" &&
            state.password === "Admin@1234"
          ) {
            set({
              user: {
                token: "1234",
              },
            });
          } else {
            toast.error("Wrong username or password!");
            set({
              user: null,
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
      logout: () => {
        set({
          user: null,
        });
      },
    }),
    {
      name: "auth",
    }
  )
);

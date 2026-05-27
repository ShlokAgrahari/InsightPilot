
import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({

  user: JSON.parse(
    localStorage.getItem("user")
  ) || null,

  token: localStorage.getItem("token") || null,

  loading: false,


  // SIGNUP
  signup: async (
    name,
    email,
    phone,
    password
  ) => {

    try {

      set({ loading: true });

      const res = await api.post(
        "/auth/signup",
        {
          name,
          email,
          phone,
          password,
        }
      );

      set({ loading: false });

      return res.data;

    } catch (error) {

      set({ loading: false });

      throw error;
    }
  },


  // LOGIN
  login: async (
    email,
    password
  ) => {

    try {

      set({ loading: true });

      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      // SAVE TO LOCALSTORAGE
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      // UPDATE GLOBAL STATE
      set({

        user: res.data.user,
        token: res.data.token,
        loading: false,
      });

      return res.data;

    } catch (error) {

      set({ loading: false });

      throw error;
    }
  },


  // LOGOUT
  logout: () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    set({

      user: null,
      token: null,
    });
  },

}));

export default useAuthStore;
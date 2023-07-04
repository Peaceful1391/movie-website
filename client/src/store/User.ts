import { create } from "zustand";
import axios from "../utils/axios";

export const useMoviesStore = create((set) => ({
  user: null,
  loginUser: async (email, password) => {
    const { data } = await axios.post(`/auth/login/`, {
      email: email,
      password: password,
    });
    set(() => {
      window.localStorage.setItem("token", data.token);
      return {
        user: data,
      };
    });
  },
  checkUser: async () => {
    const token = window.localStorage.getItem("token");
    const { data } = await axios.get("/auth/me/", {
      headers: {
        authorization: token,
      },
    });
    set({ user: data });
  },
}));

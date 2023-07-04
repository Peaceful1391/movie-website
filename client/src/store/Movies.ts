import { create } from "zustand";
import axios from "../utils/axios";

export const useMoviesStore = create((set) => ({
  movies: [],
  movie: null,
  getMovies: async () => {
    const { data } = await axios.get("/posts/");
    set({ movies: data });
  },
  getMovie: async (id) => {
    const { data } = await axios.get(`/posts/${id}`);
    set({ movie: data });
  },
}));

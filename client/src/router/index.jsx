import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import HomePage from "../pages/HomePage.jsx";
import MoviesPage from "../pages/MoviesPage.jsx";
import MoviePage from "../pages/MoviePage.jsx";

const DefaultLayout = () => (
  <>
    <Header />

    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/movies/",
        element: <MoviesPage />,
      },
      {
        path: "/movies/:id/",
        element: <MoviePage />,
      },
    ],
  },
]);

export default router;

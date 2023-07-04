import React, { useEffect } from "react";
import { useMoviesStore } from "../store/Movies";
import Card from "../components/Card";
import { Link } from "react-router-dom";

function MoviesPage() {
  const movies = useMoviesStore((state) => state.movies);
  const getMovies = useMoviesStore((state) => state.getMovies);
  useEffect(() => {
    async function moviesLogic() {
      await getMovies().then(() => {
        console.log(movies);
      });
    }
    moviesLogic();
  }, []);
  return (
    <div className="container">
      <div className="movies-list">
        {movies.map((item) => {
          return (
            <Link to={item._id} key={item._id}>
              <Card title={item.title} image={item.imageUrl} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MoviesPage;

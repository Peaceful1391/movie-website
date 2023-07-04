import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMoviesStore } from "../store/Movies";
import { Player } from "video-react";

function MoviePage() {
  let { id } = useParams();
  const movie = useMoviesStore((state) => state.movie);
  const getMovie = useMoviesStore((state) => state.getMovie);
  useEffect(() => {
    getMovie(id);
    console.log(movie);
  }, []);
  return (
    <div className="container">
      {movie && (
        <div className="movie">
          <div className="movie-description">
            <div className="movie-image">
              <img src={movie.imageUrl} />
            </div>
            <div className="movie-text">
              <p>{movie.text} </p>
            </div>
          </div>
          <div className="movie-player">
            <Player>
              <source src={movie.videoUrl} />
            </Player>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoviePage;

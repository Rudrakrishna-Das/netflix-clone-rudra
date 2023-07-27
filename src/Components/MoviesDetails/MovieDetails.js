import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Classes from "./MovieDetails.module.css";
const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const runMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&api_key=3f6796292096fcbf7dfcb9ab32fe7f6c`
      );
      if (!res.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await res.json();
      setMovie(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    runMovies();
  }, []);
  console.log(movie);
  let year,
    genres,
    hour,
    min = 0;

  if (movie !== null) {
    year = movie.release_date !== undefined && movie.release_date.split("-");

    genres = movie.genres.length > 0 && movie.genres.map((ele) => ele.name);
    hour = movie.runtime !== undefined && Math.floor(movie.runtime / 60);
    min = movie.runtime !== undefined && Math.floor(movie.runtime % 60);
  }

  return (
    <>
      {movie === null && loading === true && <h1>LOADING</h1>}
      <section
        className={Classes["movie-details"]}
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0,0.85),rgb(0, 0, 0,0.85)),url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
          height: "28rem",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <img
          className={Classes["movie-image"]}
          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
          alt={movie?.title || movie?.name || movie?.original_name}
        />
        <div className={Classes.details}>
          <h1>
            {movie?.title || movie?.name || movie?.original_name} (
            {year && year[0]})
          </h1>
          <p className={Classes.info}>
            {`${movie?.release_date}`} &nbsp; &#x2022;
            {`${genres && genres.join(", ")}`} &nbsp; &#x2022;
            {`${hour}h ${min}min`}
          </p>
          <h5>{movie?.tagline}</h5>
          <p>{movie?.overview}</p>
        </div>
      </section>
    </>
  );
};

export default MovieDetails;

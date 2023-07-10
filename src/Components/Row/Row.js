import { useEffect, useState } from "react";

import axios from "../../Requests $ Axios/axios";

import Classes from "./Row.module.css";

const Row = ({ title, fetchURL, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHnadler = async () => {
    //FETCH

    // const response = await fetch(fetchURL);

    // const { results } = await response.json();

    //AXIOS

    const { data } = await axios.get(fetchURL);
    setMovies(data.results);
  };

  useEffect(() => {
    fetchMoviesHnadler();
  }, [fetchURL]);

  const base_URL = "https://image.tmdb.org/t/p/original/";
  return (
    <div className={Classes.row}>
      <h1 className={Classes.title}>{title}</h1>
      <div className={Classes.posters}>
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`${Classes["movie_poster"]} ${
                  isLargeRow && Classes["large_movie_poster"]
                }`}
                key={movie.id}
                src={`${base_URL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Row;

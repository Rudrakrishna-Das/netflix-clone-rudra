import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { BASE_URL } from "../../Requests $ Axios/Helper";

import Classes from "./SearchResult.module.css";
import PagesButton from "./PagesButton/PagesButton";

const SearchResult = () => {
  const [foundMovies, setFoundMovies] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const { name } = useParams();

  const searchName = name
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-zA-Z]/g, "")
    .split(" ")
    .join("+");
  const fetchSearchMovie = async () => {
    const reqMovie = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=3f6796292096fcbf7dfcb9ab32fe7f6c&query=${searchName}&page=${activePage}`
    );

    const dataMovie = await reqMovie.json();

    setFoundMovies(dataMovie);
  };

  useEffect(() => {
    fetchSearchMovie();
    document.title = `${searchName}`;
  }, [searchName, activePage]);

  const nextPageHandler = () => {
    setActivePage((prevPage) => prevPage + 1);
  };

  const prevPageHandler = () => {
    setActivePage((prevPage) => prevPage - 1);
  };

  const toFirstPageHandler = () => {
    setActivePage(1);
  };
  const toLastPageHandler = () => {
    setActivePage(foundMovies?.total_pages);
  };

  return (
    <section className={Classes["movie_details"]}>
      {" "}
      {foundMovies !== null ? (
        <>
          <div className={Classes["all_movies"]}>
            <ul>
              {" "}
              {foundMovies.results.map((movie) => (
                <li key={movie.id} className={Classes.movie}>
                  <img
                    src={BASE_URL + movie?.poster_path}
                    alt={movie?.title || movie?.name || movie?.original_name}
                  />
                  <div className={Classes["movie_info"]}>
                    <h1>
                      <Link
                        to={`/search-result-info/${
                          movie.genre_ids.length === 0 ? "tv" : "movie"
                        }/${movie.id}/${
                          movie?.title || movie?.name || movie?.original_name
                        }`}
                      >
                        {movie?.title || movie?.name || movie?.original_name}
                      </Link>
                    </h1>
                    <p>{movie?.overview}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={Classes.page}>
            <h3>Pages</h3>

            <PagesButton
              onFirstPage={toFirstPageHandler}
              onLastPage={toLastPageHandler}
              currentPage={activePage}
              onPrevPage={prevPageHandler}
              onNextPage={nextPageHandler}
              totalPages={foundMovies?.total_pages}
            />
          </div>
        </>
      ) : (
        <h1>LOADING....</h1>
      )}
    </section>
  );
};

export default SearchResult;

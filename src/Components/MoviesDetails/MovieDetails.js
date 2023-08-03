import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";

import Episodes from "../Episodes/Episodes";
import { BASE_URL } from "../../Requests $ Axios/Helper";

import Classes from "./MovieDetails.module.css";
const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [tvEpisode, setTvEpisode] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [title, setTitle] = useState("");
  const { id, type } = useParams();

  const baseUrl = BASE_URL;
  const runMovies = async () => {
    try {
      const mov = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?&append_to_response=videos&api_key=3f6796292096fcbf7dfcb9ab32fe7f6c`
      );
      const movData = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=3f6796292096fcbf7dfcb9ab32fe7f6c`
      );

      if (!mov.ok || !movData.ok) {
        throw new Error("Something Went Wrong");
      }
      const dataOfMovie = await mov.json();
      const dataAboutMovie = await movData.json();
      if (type === "movie") {
        setMovie(dataOfMovie);
        setMovieData(dataAboutMovie);
        setTitle(
          dataOfMovie?.title || dataOfMovie?.name || dataOfMovie?.original_name
        );
        return;
      }
      const allEpisodes = [];
      const seasons = dataOfMovie?.seasons.filter((mov) =>
        mov.name.toLowerCase().includes("season")
      );
      for (let i = 0; i < seasons?.length; i++) {
        const [season, num] = seasons[i].name.toLowerCase().trim().split(" ");
        const res = await fetch(
          ` https://api.themoviedb.org/3/tv/${id}?api_key=3f6796292096fcbf7dfcb9ab32fe7f6c&append_to_response=${season}/${num}`
        );
        const data = await res.json();
        allEpisodes.push(data);
      }

      setMovie(dataOfMovie);
      setMovieData(dataAboutMovie);
      setTvEpisode(allEpisodes);
      setTitle(
        dataOfMovie?.title || dataOfMovie?.name || dataOfMovie?.original_name
      );
    } catch (err) {
      setHasError(true);
    }
  };
  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    runMovies();
    document.title = title;
    onTop();
  }, [title]);

  console.log(title);

  let year, genres, hour, min, movieName;

  if (movie !== null && movie !== undefined) {
    year =
      (movie.release_date !== undefined && movie.release_date.split("-")) ||
      (movie.first_air_date !== undefined && movie.first_air_date.split("-"));

    genres = movie.genres.length > 0 && movie.genres.map((ele) => ele.name);
    hour = movie.runtime !== undefined && Math.floor(movie.runtime / 60);
    min = movie.runtime !== undefined && Math.floor(movie.runtime % 60);
    movieName = movie.title || movie.name || movie.original_name;
  }

  const episode = tvEpisode?.map((tv, i) => {
    const name = "season/" + (i + 1);
    return <Episodes details={tv} key={name} fieldNmae={name} />;
  });

  const trailer = movie?.videos.results.filter((video) =>
    video.name.includes("Trailer")
  );

  const otherTrailers = trailer?.filter(
    (video) => video.name !== trailer[0].name
  );
  const totalRunTime =
    hour !== undefined &&
    min !== undefined &&
    hour !== false &&
    min !== false &&
    ` ${hour}h ${min}min`;

  const status =
    type === "tv" && movie?.in_production ? "(Ongoing)" : "(Finished)";
  const movieMainCharacters = movieData !== null && movieData.cast.slice(0, 3);
  const cast = movieData?.cast.slice(0, 9);
  const stars =
    movieMainCharacters?.length > 0 ? (
      <p>
        Stars &nbsp; &nbsp; &nbsp; {movieMainCharacters[0]?.original_name}
        &nbsp; &#x2022; {movieMainCharacters[1]?.original_name} &nbsp; &#x2022;
        {movieMainCharacters[2]?.original_name}
      </p>
    ) : (
      "NO Cast Found"
    );
  return (
    <section>
      {hasError ? (
        <h1 className={Classes.err}>Something Went Wrong</h1>
      ) : movie && hasError !== true ? (
        <>
          <div
            style={{
              backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0,0.85),rgb(0, 0, 0,0.85)),url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
              height: "38rem",
              width: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className={Classes["movie-info"]}>
              <img
                className={Classes["movie-image"]}
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                alt={movie?.title || movie?.name || movie?.original_name}
              />
              <div className={Classes.details}>
                <h1 className={Classes.name}>
                  {movieName}({year && year[0]}){type !== "movie" && status}
                </h1>
                <p className={Classes.info}>
                  {`${movie?.release_date || movie?.first_air_date}`}&nbsp;
                  &#x2022;
                  {` ${genres && genres.join(", ")}`} &nbsp; &#x2022;
                  {`${totalRunTime ? totalRunTime : " 2h+"} `}
                </p>
                {type !== "movie" && (
                  <h4 className={Classes["last_upload"]}>
                    Last Episode:- {movie?.last_air_date}
                  </h4>
                )}
                <h3 className={Classes.tagline}>
                  {movie?.tagline.toUpperCase()}
                </h3>
                <div className={Classes.description}>
                  <p>{movie?.overview}</p>
                </div>
                <div className={Classes.stars}>{stars}</div>
              </div>
            </div>
            <div className={Classes.fade}></div>
          </div>
          <div
            className={`${
              cast?.length > 0 ? Classes["all_details"] : Classes["no_cast"]
            }`}
          >
            <h1>Top Cast</h1>
            <ul className={Classes.cast}>
              {cast?.length > 0 ? (
                cast.map((charcter) => (
                  <li key={charcter?.id}>
                    <Link to={`/people/${charcter.id}/${charcter.name}`}>
                      <img
                        className={Classes["charcter_img"]}
                        src={baseUrl + charcter.profile_path}
                      />
                      <h3>{charcter.original_name || charcter.name}</h3>
                      <p>{charcter.character}</p>
                    </Link>
                  </li>
                ))
              ) : (
                <h2>NO CHARACTER FOUND</h2>
              )}
            </ul>
          </div>
          ;
          {type === "tv" && (
            <div className={Classes["episodes_details"]}>
              <h1 className={Classes.title}>ALL SEASONS</h1>
              <ul className={Classes.season}>{episode}</ul>
            </div>
          )}
          {trailer?.length > 0 ? (
            <div className={Classes["other_movie_info"]}>
              <h1>WATCH TRAILER</h1>
              <ReactPlayer
                style={{ margin: "2% auto" }}
                width="80%"
                controls="true"
                url={`https://www.youtube.com/watch?v=${trailer[0]?.key}`}
              />
              {otherTrailers?.length > 0 && (
                <>
                  <h1>OTHER TRAILERS</h1>
                  <ul className={Classes["other_trailer"]}>
                    {otherTrailers.map((video) => (
                      <li key={video.id}>
                        <ReactPlayer
                          controls
                          style={{ margin: "2% 3%" }}
                          width="100%"
                          url={`https://www.youtube.com/watch?v=${
                            trailer !== undefined && video.key
                          }`}
                        />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ) : (
            <h1 className={Classes["not_found"]}> No Trailer Found</h1>
          )}
        </>
      ) : (
        <div className={Classes.loading}>
          <h1>LOADING....</h1>
        </div>
      )}
    </section>
  );
};

export default MovieDetails;

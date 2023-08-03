import { useEffect, useState } from "react";
import Classes from "./Banner.module.css";

import axios from "../../Requests $ Axios/axios";
import { requests } from "../../Requests $ Axios/Responses";
import { BASE_URL } from "../../Requests $ Axios/Helper";
import ReactPlayer from "react-player";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [videoPlay, setVideoPlay] = useState(false);
  const truncet = (string, n) => {
    return !string
      ? "No Description found"
      : string.length > n
      ? string.slice(0, n) + "..."
      : string;
  };
  const movieFetchHandler = async () => {
    //FETCH

    // const response = await fetch(requests.fetchNetflixOriginals);
    // const { results } = await response.json();

    //AXIOS
    const { data } = await axios.get(requests.netflixOriginals);

    const indexNum = Math.trunc(Math.random() * data.results.length);
    const properMovie = data.results[indexNum];
    const mov = await fetch(
      `https://api.themoviedb.org/3/tv/${properMovie.id}?&append_to_response=videos&api_key=3f6796292096fcbf7dfcb9ab32fe7f6c`
    );
    const movData = await mov.json();
    setMovieData(movData);
    setMovies(properMovie);
  };

  useEffect(() => {
    movieFetchHandler();
    document.title = "All Movies";
  }, []);

  const openVideoPlayHandler = () => {
    setVideoPlay(true);
  };

  const closeVideoHandler = () => {
    setVideoPlay(false);
  };

  const trailer =
    movieData?.videos?.results.length > 0 ? (
      movieData?.videos.results.filter((video) =>
        video.name.toLowerCase().includes("trailer")
      )
    ) : (
      <h1>No video Found</h1>
    );

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0,0.5),rgb(0, 0, 0,0.5)),url(${BASE_URL}${movies?.backdrop_path})`,
        height: "38.5rem",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {videoPlay ? (
        <div onClick={closeVideoHandler} className={Classes.overlay}>
          <ReactPlayer
            style={{
              padding: "14% 8%",
              paddingTop: "8%",
            }}
            width="80%"
            controls="true"
            url={`https://www.youtube.com/watch?v=${trailer[0]?.key}`}
          />
        </div>
      ) : (
        <div className={Classes["banner_content"]}>
          <h1 className={Classes.name}>
            {movies?.title || movies?.name || movies?.original_name}
          </h1>

          <button onClick={openVideoPlayHandler} className={Classes.play}>
            Play
          </button>

          <p className={Classes.description}>
            {truncet(`${movies?.overview}`, 150)}
          </p>
        </div>
      )}
      <div className={Classes.fade}></div>
    </section>
  );
};
export default Banner;

import { useEffect, useState } from "react";
import Classes from "./Banner.module.css";

import axios from "../../Requests $ Axios/axios";
import { requests } from "../../Requests $ Axios/Responses";

const Banner = () => {
  const [movies, setMovies] = useState([]);
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
    setMovies(data.results[indexNum]);
  };

  useEffect(() => {
    movieFetchHandler();
  }, []);

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0,0.5),rgb(0, 0, 0,0.5)),url(https://image.tmdb.org/t/p/original/${movies?.backdrop_path})`,
        height: "38.5rem",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className={Classes["banner_content"]}>
        <h1 className={Classes.name}>
          {movies?.title || movies?.name || movies?.original_name}
        </h1>

        <button className={Classes.play}>Play</button>
        <button className={Classes.list}>My List</button>

        <p className={Classes.description}>
          {truncet(`${movies?.overview}`, 150)}
        </p>
      </div>
      <div className={Classes.fade}></div>
    </section>
  );
};
export default Banner;

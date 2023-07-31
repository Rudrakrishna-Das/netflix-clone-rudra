import { useState } from "react";

import Classes from "./Episodes.module.css";

const Episodes = ({ details, fieldNmae }) => {
  const [episodeOpen, setEpisodeOpen] = useState(false);

  const episodes = details[fieldNmae].episodes;

  const episodeOpenCloseHandler = () => {
    setEpisodeOpen((prevState) => !prevState);
  };

  const baseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <>
      <li className={Classes.episode} onClick={episodeOpenCloseHandler}>
        {details[fieldNmae].name}
      </li>
      {episodeOpen && (
        <div className={Classes["episode_show"]}>
          {episodes.map((episode) => (
            <div className={Classes["episode_details"]} key={episode.id}>
              <img
                className={Classes["episode_image"]}
                src={`${baseUrl}${episode.still_path}`}
              />

              <div className={Classes["episode_info"]}>
                <h3>{episode.name}</h3>
                <p>{episode.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Episodes;

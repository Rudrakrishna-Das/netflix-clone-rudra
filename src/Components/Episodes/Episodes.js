import { useState } from "react";

import Classes from "./Episodes.module.css";
import { BASE_URL } from "../../Requests $ Axios/Helper";

const Episodes = ({ details, fieldNmae }) => {
  const [episodeOpen, setEpisodeOpen] = useState(false);

  const episodes = details[fieldNmae].episodes;

  const episodeOpenCloseHandler = () => {
    setEpisodeOpen((prevState) => !prevState);
  };
  const baseUrl = BASE_URL;

  return (
    <>
      <li className={Classes.episode} onClick={episodeOpenCloseHandler}>
        {details[fieldNmae].name}
      </li>
      {episodeOpen && (
        <div className={Classes["episode_show"]}>
          {episodes.map((episode) => (
            <div key={episode.id}>
              <h1>
                Season {episode.season_number} Episode {episode.episode_number}
              </h1>
              <div className={Classes["episode_details"]}>
                <img
                  className={Classes["episode_image"]}
                  src={`${baseUrl}${episode.still_path}`}
                />

                <div className={Classes["episode_info"]}>
                  <h1>{episode.name}</h1>
                  <h4>Release Date:- &nbsp;&nbsp; {episode.air_date}</h4>
                  <h5>
                    Duration:- &nbsp;&nbsp;
                    {`${
                      episode.runtime / 60 === 0
                        ? ""
                        : (episode.runtime / 60).toFixed(0) + "h"
                    } ${
                      episode.runtime % 60 === 0
                        ? ""
                        : (episode.runtime % 60).toFixed(0) + "min"
                    }`}
                  </h5>
                  <p>{episode.overview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Episodes;

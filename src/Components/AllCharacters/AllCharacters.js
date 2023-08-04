import { useState } from "react";
import Classes from "./AllCharacters.module.css";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../Requests $ Axios/Helper";

const AllCharacters = () => {
  const [characters, setCharacters] = useState(null);
  const { type, id } = useParams();

  const fetchCharactersDetails = async () => {
    const characterReq = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=3f6796292096fcbf7dfcb9ab32fe7f6c`
    );

    const characterData = await characterReq.json();

    setCharacters(characterData);
  };

  useEffect(() => {
    fetchCharactersDetails();
  }, []);
  console.log(characters);
  return (
    <>
      {characters?.cast.length > 0 ? (
        <div className={Classes["all_cast"]}>
          <h1>CASTS</h1>
          <ul className={Classes.cast}>
            {characters?.cast.map((character) => (
              <li className={Classes.characters} key={character?.id}>
                <Link to={`/people/${character.id}/${character.name}`}>
                  <img
                    className={Classes["charcter_img"]}
                    src={BASE_URL + character.profile_path}
                    alt={character.name}
                  />
                  <h3>{character.original_name || character.name}</h3>
                  <p className={Classes.desc}>{character.character}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>No Cast Found</h1>
        </div>
      )}

      {characters?.crew.length > 0 ? (
        <div className={Classes["all_cast"]}>
          <h1>CREW MEMBERS</h1>
          <ul className={Classes.cast}>
            {characters?.crew.map((character) => (
              <li className={Classes.characters} key={character?.id}>
                <Link to={`/people/${character.id}/${character.name}`}>
                  <img
                    className={Classes["charcter_img"]}
                    src={BASE_URL + character.profile_path}
                    alt={character.name}
                  />
                  <h3>{character.original_name || character.name}</h3>
                  <p className={Classes.desc}>{character.character}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>No Crew Member Found</h1>
        </div>
      )}
    </>
  );
};

export default AllCharacters;

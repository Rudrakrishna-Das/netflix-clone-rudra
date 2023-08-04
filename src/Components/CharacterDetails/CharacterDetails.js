import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BASE_URL } from "../../Requests $ Axios/Helper";
import Classes from "./CharacterDetails.module.css";

const CharacterDetails = () => {
  const [bio, setBio] = useState(null);
  const [images, setImages] = useState(null);
  const [imageOpen, setImageOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState("");
  const { id } = useParams();

  const fetchCharacterDetails = async () => {
    const bio = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=3f6796292096fcbf7dfcb9ab32fe7f6c`
    );
    const img = await fetch(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=3f6796292096fcbf7dfcb9ab32fe7f6c`
    );

    const bioData = await bio.json();
    const imageDetails = await img.json();

    setBio(bioData);
    setImages(imageDetails);
    setTitle(bioData.name);
  };

  const baseUrl = BASE_URL;
  useEffect(() => {
    fetchCharacterDetails();
    document.title = title;
  }, [title]);
  const lastName = bio?.name.split(" ");
  let fullName = bio?.also_known_as.filter((n) =>
    n.includes(lastName[lastName.length - 1])
  );
  if (fullName?.length > 0) {
    const maxNmaeLength = Math.max(...fullName?.map((n) => n.length));
    fullName = fullName?.filter((n) => n.length === maxNmaeLength);
  }
  const imageOpenHandler = (imgURL) => {
    setImageOpen(true);
    setImageUrl(imgURL);
  };

  const closeImageHandler = () => {
    setImageOpen(false);
  };
  const birthDate = new Date(bio?.birthday);
  let age;
  if (bio?.deathDay !== undefined) {
    const deathDate = bio?.deathday !== null && new Date(bio?.deathday);
    const diedPerson = deathDate - birthDate.getTime();
    const diedAge = new Date(diedPerson);
    age = diedAge.getFullYear() - 1970;
  } else {
    const nowDate = Date.now();
    const alivePerson = nowDate - birthDate.getTime();
    const aliveAge = new Date(alivePerson);
    age = Math.abs(aliveAge.getUTCFullYear() - 1970);
  }

  return (
    <section>
      {bio ? (
        <div className={Classes["all_details"]}>
          <h1 className={Classes.name}>{bio.name.toUpperCase()}</h1>
          <div className={Classes["personal_details"]}>
            <img
              className={Classes["person_img"]}
              src={`${baseUrl}${bio.profile_path}`}
              alt={bio.name}
            />

            <div className={Classes.details}>
              <h3>
                Full Name:- &nbsp; &nbsp;{" "}
                {fullName.length > 0 ? fullName[0] : bio.name}
              </h3>
              <h3>profession:- &nbsp;&nbsp; {bio.known_for_department}</h3>
              <h4>
                BirthDate:- &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; {bio.birthday}{" "}
              </h4>
              {bio.deathday && (
                <h5>
                  Died On:- &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {bio.deathday}
                </h5>
              )}
              {bio.deathday ? (
                <h5>
                  Died On Age:-
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {age}{" "}
                </h5>
              ) : (
                <h5>
                  Present Age:-
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {age}{" "}
                </h5>
              )}
              <h5>
                Place oF Born:- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {bio.place_of_birth}
              </h5>
            </div>
          </div>
          <div className={Classes.description}>
            {bio.biography.length === 0 ? (
              <h1>No BIO Available</h1>
            ) : (
              bio.biography
            )}{" "}
          </div>
          <div className={Classes["character_image"]}>
            {imageOpen && imageUrl && (
              <div className={Classes["big_image"]}>
                <div
                  onClick={closeImageHandler}
                  className={Classes.overlay}
                ></div>
                <img src={imageUrl} alt={bio?.name} />{" "}
              </div>
            )}
            {images?.profiles?.length > 0 ? (
              <ul className={Classes["person_img_details"]}>
                {images.profiles.map((image, i) => (
                  <li key={i}>
                    <img
                      onClick={imageOpenHandler.bind(
                        null,
                        BASE_URL + image.file_path
                      )}
                      src={BASE_URL + image.file_path}
                      alt={bio?.name}
                    />
                  </li>
                ))}{" "}
              </ul>
            ) : (
              <div>
                <h1>No Images Found</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h1>LOADING......</h1>
        </div>
      )}
    </section>
  );
};

export default CharacterDetails;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  netflixLogoSrc,
  avatarLogoSrc,
  searchIcon,
} from "../../Images/imageFile";
import Classes from "./Navigation.module.css";

const Navigation = (props) => {
  const searchRef = useRef();
  const [trasparentNavbar, setTransparentNavbar] = useState(false);

  const navigate = useNavigate();

  const openSighnupPageHandler = () => {
    props.onClick();
  };

  const profilePageHandler = () => {
    navigate("/profile");
  };
  const homePageHandler = () => {
    props.loggedIn ? navigate("/movies&tv-shows") : navigate("/");
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;
  };

  const transparentNavbarHandler = () => {
    if (window.scrollY > 300) {
      setTransparentNavbar(true);
    } else {
      setTransparentNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transparentNavbarHandler);

    return () => window.removeEventListener("scroll", transparentNavbarHandler);
  }, []);
  return (
    <nav
      className={`${Classes.nav} ${trasparentNavbar && Classes["nav_black"]}`}
    >
      <div
        className={`${
          !props.loggedIn ? Classes.nav_not_logged_in : Classes["nav__content"]
        }`}
      >
        <img
          onClick={homePageHandler}
          src={netflixLogoSrc}
          alt="netflix"
          className={Classes["netflix_logo"]}
        />
        {props.loggedIn && (
          <form className={Classes.search} onSubmit={searchHandler}>
            <input
              className={Classes["search_field"]}
              type="text"
              placeholder="Search Your favourite MOVIES"
              ref={searchRef}
            />
            <button type="submit" className={Classes["search_btn"]}>
              <img src={searchIcon} />
            </button>
          </form>
        )}
        {!props.loggedIn ? (
          <button className={Classes.sign_in} onClick={openSighnupPageHandler}>
            Sign In
          </button>
        ) : (
          <img
            onClick={profilePageHandler}
            src={avatarLogoSrc}
            alt="your avatar"
            className={Classes["avatar_logo"]}
          />
        )}
      </div>
    </nav>
  );
};
export default Navigation;

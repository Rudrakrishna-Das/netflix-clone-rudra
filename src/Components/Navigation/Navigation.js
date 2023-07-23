import { useEffect, useState } from "react";

import { netflixLogoSrc } from "../../Images/imageFile";
import { avatarLogoSrc } from "../../Images/imageFile";

import Classes from "./Navigation.module.css";
import { useNavigate } from "react-router-dom";

const Navigation = (props) => {
  const [trasparentNavbar, setTransparentNavbar] = useState(false);

  const navigate = useNavigate();

  const openSighnupPageHandler = () => {
    props.onClick();
  };

  const profilePageHandler = () => {
    navigate("/profile");
  };
  const homePageHandler = () => {
    navigate("/");
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

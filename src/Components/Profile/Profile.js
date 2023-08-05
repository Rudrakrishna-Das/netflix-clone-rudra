import { useSelector } from "react-redux";

import { auth } from "../../firebase";

import { avatarLogoSrc } from "../../Images/imageFile";

import { selectUser } from "../../features/userSlice";

import Classes from "./Profile.module.css";
import PlanScreen from "./PlanScreen/PlanScreen";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const signoutHandler = () => {
    auth.signOut();
    localStorage.removeItem("user"); //removing from local storage when sighnout
    navigate("/");
  };

  useEffect(() => {
    document.title = "profile";
  }, []);
  return (
    <section className={Classes["profile_content"]}>
      <h1 className={Classes.head}>Edit Profile</h1>
      <div className={Classes.divide}></div>

      <div className={Classes.body}>
        <img
          className={Classes["avatar_image"]}
          src={avatarLogoSrc}
          alt="Avatar logo"
        />
        <div className={Classes["profile__info"]}>
          <input type="email" value={user.email} disabled />
          <div className={Classes["plan-info"]}>
            <h3>Plans </h3>
            <div className={Classes.divide}></div>
            <PlanScreen />

            <div className={Classes.divide}></div>
            <button
              onClick={signoutHandler}
              className={`${Classes.sighnout} ${Classes.btn}`}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

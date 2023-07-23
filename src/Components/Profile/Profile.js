import { useState } from "react";
import { useSelector } from "react-redux";

import { auth } from "../../firebase";

import { avatarLogoSrc } from "../../Images/imageFile";

import { selectUser } from "../../features/userSlice";

import Classes from "./Profile.module.css";

const Profile = () => {
  const [standardSubscription, setStandardSubscription] = useState(false);
  const [basicSubscription, setBasicSubscription] = useState(false);
  const [premiumSubscription, setPremiumSubscription] = useState(false);

  const user = useSelector(selectUser);

  const standardSubscriptionHandler = () => {
    setStandardSubscription((prevState) => !prevState);
  };
  const basicSubscriptionHandler = () => {
    setBasicSubscription((prevState) => !prevState);
  };
  const premiumSubscriptionHandler = () => {
    setPremiumSubscription((prevState) => !prevState);
  };

  const signoutHandler = () => {
    auth.signOut();
  };
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
            <h3>Plans (Current Plan: Premium)</h3>
            <div className={Classes.divide}></div>
            <h4 className={Classes.date}>Renewal Date:04/12/2023</h4>
            <div className={Classes.subscription}>
              <div>
                <h5>Netflix Standard</h5>
                <h6>1080p</h6>
              </div>
              <div className={Classes.action}>
                <button
                  onClick={standardSubscriptionHandler}
                  className={`${Classes["subscribe_button"]} ${Classes.btn} ${
                    standardSubscription ? Classes.subscribed : ""
                  }`}
                >
                  {standardSubscription ? "Current Package" : "Subscribe"}
                </button>
              </div>
            </div>
            <div className={Classes.subscription}>
              <div>
                <h5>Netflix Basic</h5>
                <h6>480p</h6>
              </div>
              <div className={Classes.action}>
                <button
                  onClick={basicSubscriptionHandler}
                  className={`${Classes["subscribe_button"]} ${Classes.btn}  ${
                    basicSubscription ? Classes.subscribed : ""
                  }`}
                >
                  {basicSubscription ? "Current Package" : "Subscribe"}
                </button>
              </div>
            </div>
            <div className={Classes.subscription}>
              <div>
                <h5>Netflix Premium</h5>
                <h6>4k+HDR</h6>
              </div>
              <div className={Classes.action}>
                <button
                  onClick={premiumSubscriptionHandler}
                  className={`${Classes["subscribe_button"]} ${Classes.btn} ${
                    premiumSubscription ? Classes.subscribed : ""
                  }`}
                >
                  {premiumSubscription ? "Current Package" : "Subscribe"}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={signoutHandler}
            className={`${Classes.sighnout} ${Classes.btn}`}
          >
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;

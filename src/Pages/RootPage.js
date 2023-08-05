import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, json, useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "../Components/Login/Login";
import Navigation from "../Components/Navigation/Navigation";
const RootPage = () => {
  const [isSignin, setIsSignin] = useState(false);

  const navigate = useNavigate();

  const openSignupHandler = () => {
    setIsSignin((prevState) => !prevState);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //Login

        localStorage.setItem(
          "user",
          JSON.stringify({
            isLoggedin: true,
            id: authUser.uid,
            email: authUser.email,
          })
        );
        navigate("/movies&tv-shows");
      } else {
        //Logout
        localStorage.removeItem("user");
      }
    });

    return unsubscribe;
  }, []);

  const userLocal = JSON.parse(localStorage.getItem("user"));

  console.log(userLocal);

  return (
    <>
      <Navigation
        loggedIn={userLocal?.isLoggedin}
        onClick={openSignupHandler}
      />
      <main style={{ width: "100%" }}>
        {!userLocal?.isLoggedin ? (
          <Login isSignin={isSignin} onClick={openSignupHandler} />
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
};

export default RootPage;

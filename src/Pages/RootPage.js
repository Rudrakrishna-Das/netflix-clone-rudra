import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "../Components/Login/Login";
import Navigation from "../Components/Navigation/Navigation";

import { login, logout, selectUser } from "../features/userSlice";

const RootPage = () => {
  const user = useSelector(selectUser);
  const isLogin = user !== null;
  const dispatch = useDispatch();

  const [isSignin, setIsSignin] = useState(false);

  const navigate = useNavigate();

  const openSignupHandler = () => {
    setIsSignin((prevState) => !prevState);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //Login
        dispatch(
          login({
            id: authUser.uid,
            email: authUser.email,
          })
        );
        navigate("/");
      } else {
        //Logout
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Navigation loggedIn={isLogin} onClick={openSignupHandler} />
      <main>
        {!isLogin ? (
          <Login isSignin={isSignin} onClick={openSignupHandler} />
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
};

export default RootPage;

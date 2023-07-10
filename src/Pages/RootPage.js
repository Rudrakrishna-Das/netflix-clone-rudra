import { Outlet, redirect } from "react-router-dom";

import Navigation from "../Components/Navigation/Navigation";
import Login from "../Components/Login/Login";
import { useState } from "react";

const RootPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const sighninHandler = () => {
    setIsLogin(true);
  };
  return (
    <>
      <Navigation loggedIn={isLogin} sighnin={sighninHandler} />
      <main>{!isLogin ? <Login /> : <Outlet />}</main>
    </>
  );
};

export default RootPage;

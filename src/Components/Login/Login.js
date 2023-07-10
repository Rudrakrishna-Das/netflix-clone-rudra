import { useState } from "react";
import Classes from "./Login.module.css";
import Signup from "../Signup/Signup";

const Login = () => {
  const [IsSignup, setIsSignup] = useState(false);

  const openSignupHandler = (e) => {
    e.preventDefault();
    setIsSignup(true);
  };
  return (
    <div className={Classes.login_screen}>
      <Signup />
      {/* <div className={Classes.login_screen_content}>
        <h1>Unlimited movies, TV shows and more</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <h3>
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
      </div>
      <div className={Classes.login_screen_form}>
        <form>
          <input
            className={Classes.login_screen_input}
            type="email"
            placeholder="Email Address"
          />
          <button className={Classes.get_started} onClick={openSignupHandler}>
            GET STARTED
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default Login;

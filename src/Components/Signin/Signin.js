import { useRef } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

import Classes from "./Signin.module.css";

const Signin = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const registerHandler = () => {
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => console.log(authUser))
      .catch((err) => alert(err.message));
  };
  const signInHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((user) => console.log(user))
      .catch((err) => alert(err.message));
  };
  return (
    <section className={Classes.signup}>
      <form className={Classes["form-control"]}>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signInHandler}>
          Sign In
        </button>

        <h4>
          <span className={Classes.new}>New to NETFLIX? </span>{" "}
          <span className={Classes.link} onClick={registerHandler}>
            Sign Up now
          </span>
        </h4>
      </form>
    </section>
  );
};

export default Signin;

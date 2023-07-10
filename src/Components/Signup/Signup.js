import Classes from "./Signup.module.css";

const Signup = () => {
  return (
    <section className={Classes.signup}>
      <form className={Classes["form-control"]}>
        <h1>Sign In</h1>
        <input placeholder="Email" type="email" />
        <input placeholder="Password" type="password" />
        <button type="submit">Sign In</button>
      </form>
    </section>
  );
};

export default Signup;

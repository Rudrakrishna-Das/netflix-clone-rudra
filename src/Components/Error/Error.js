import { useNavigate } from "react-router-dom";
import Classes from "./Error.module.css";

const Error = () => {
  const navigate = useNavigate();

  const gotToHomeHnadler = () => {
    navigate("/");
  };
  return (
    <div className={Classes.err}>
      <h1>Something went wrong</h1>
      <div className={Classes.home}>
        <p>Please go to</p>
        <button onClick={gotToHomeHnadler}>HOME</button>
      </div>
    </div>
  );
};

export default Error;

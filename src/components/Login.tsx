import { FormEvent } from "react";
import { useRef, useState, useEffect } from "react";
import { logInWithEmailAndPassword } from "../utils/authentication";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/Authentication.css";
import { faEnvelope, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import ExternalProvider from "./ExternalProvider";
import Delimiter from "./Delimiter";
import ErrorMessage from "./ErrorMessage";

export default function () {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await logInWithEmailAndPassword({ email, password });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error: any) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setErrorMessage("Incorrect email or password!");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMessage(
          "Access to this account has been temporarily disabled due to many failed \
          login attempts. You can immediately restore it by resetting your password or you can try again later."
        );
      } else {
        setErrorMessage("Something went wrong!");
        console.log(error.code);
      }
    }
  };

  return (
    <div className="authenticationPage">
      <Navbar />
      <div className="formContainer">
        {errorMessage && <ErrorMessage text={errorMessage} />}
        <div className="formContent">
          <h1 className="heading">Log in</h1>
          <ExternalProvider />
          <Delimiter text="or log in with email" />
          <form className="customForm" onSubmit={handleSubmit}>
            <div className="formField">
              <FontAwesomeIcon icon={faEnvelope} className="formIcon" />
              <input
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="Email"
              />
            </div>
            <div className="formField">
              <FontAwesomeIcon icon={faUnlock} className="formIcon" />
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="Password"
              />
            </div>
            <div className="forgotPassword">
              <span className="line">
                <a href="#">Forgot your password?</a>
              </span>
              <button>Log in</button>
            </div>
          </form>
          <div>
            Don't have an account?
            <br />
            <span className="line">
              <Link to="/signup">Sign up</Link>
            </span>
          </div>
        </div>
      </div>
      <div className="formDesign">
        <h1>Welcome Back!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        {/* <img src="login.svg" height="300px" /> */}
      </div>
    </div>
  );
}

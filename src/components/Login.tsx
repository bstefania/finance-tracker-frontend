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
  const errRef = useRef<HTMLParagraphElement>(null);

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
    setEmail("");
    setPassword("");
    setErrorMessage("hfpogfdf wsre tgh tfgrg")
    await logInWithEmailAndPassword({ email, password });
    navigate(from, { replace: true });
  };

  return (
    <div className="authenticationPage">
      <Navbar />
        <div className="formContainer">
          <div className="formContent">
          {errorMessage && <ErrorMessage text={errorMessage}/>}
            <h1 className="heading">Log in</h1>
            <ExternalProvider/>
            <Delimiter text="or log in with email"/>
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

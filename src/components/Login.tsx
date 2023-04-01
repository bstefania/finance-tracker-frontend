import { FormEvent } from "react";
import { useRef, useState, useEffect } from "react";
import { logInWithEmailAndPassword } from "../utils/authentication";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/Login.css";
import { faEnvelope, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";

export default function () {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMessage("");
  }, [email, password]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
    await logInWithEmailAndPassword({ email, password });
    navigate(from, { replace: true });
  };

  return (
    <div className="loginPage">
      <Navbar />
        <div className="formContainer">
          <div className="formContent">
            <p ref={errRef} className={errMessage ? "errmsg" : "offscreen"}>
              {errMessage}
            </p>
            <h1 className="heading">Log in</h1>
            <div className="externalProviderButton">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                className="providerIcon"
                alt=""
              />
              <span className="textContainer">Continue with Google </span>
            </div>
            <div className="externalProviderButton">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                className="providerIcon"
                alt=""
              />
              <span className="textContainer">Continue with Facebook </span>
            </div>

            <div className="delimiter">
              <span className="delimiter-text">or log in with email</span>
              <hr />
            </div>

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
                  {/*put router link here*/}
                  <a href="#">Forgot your password?</a>
                </span>
                <button>Log in</button>
              </div>
            </form>
            <div>
              Don't have an account?
              <br />
              <span className="line">
                {/*put router link here*/}
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

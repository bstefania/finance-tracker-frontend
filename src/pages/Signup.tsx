import { useRef, useState, useEffect, FormEvent } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faEnvelope,
  faUnlock,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signUpWithEmailAndPassword } from "../utils/authentication";
import { Link } from "react-router-dom";
import "../styles/Authentication.css";
import Navbar from "../components/Navbar";
import ExternalProvider from "../components/ExternalProvider";
import Delimiter from "../components/Delimiter";
import ErrorMessage from "../components/ErrorMessage";

const NAME_REGEX = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const nameRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPassword(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [name, email, password, matchPassword]);

  const clearName = () => {
    setName("");
    nameRef.current!.value = "";
  };

  const clearEmail = () => {
    setEmail("");
  };

  const clearPassword = () => {
    setPassword("");
  };

  const clearConfirmPassword = () => {
    setMatchPassword("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if button enabled with JS hack
    const v1 = NAME_REGEX.test(name);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setErrorMessage("Invalid entry!");
      return;
    }
    try {
      await signUpWithEmailAndPassword({ name, email, password });
      setSuccess(true);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email already in use!");
      } else {
        setErrorMessage("Something went wrong!");
        console.log(error.code);
      }
    }
  };

  return (
    <div className="authenticationPage">
      <Navbar header={''}/>
      <div className="formContainer">
        {errorMessage && <ErrorMessage text={errorMessage} />}
        <div className="formContent">
          <h1 className="heading">Sign up</h1>
          <ExternalProvider />
          <Delimiter text="or sign up with email" />
          <form className="customForm" onSubmit={handleSubmit}>
            <div className="formField">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <input
                type="text"
                required
                id="name"
                ref={nameRef}
                autoComplete="off"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
              />
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !name ? "hide" : "invalid"}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="iconWithAction"
                  onClick={clearName}
                />
              </span>
            </div>
            <p
              id="uidnote"
              className={name && !validName ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Your name should start with capital letter and it should contain
              only letters and spaces.
            </p>
            <div className="formField">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                type="email"
                required
                id="email"
                autoComplete="off"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="iconWithAction"
                  onClick={clearEmail}
                />
              </span>
            </div>
            <p
              id="uidnote"
              className={email && !validEmail ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Your email address must have a valid format consisting of a
              username, followed by an '@' symbol, and a domain name.
            </p>
            <div className="formField">
              <FontAwesomeIcon icon={faUnlock} className="icon" />
              <input
                type="password"
                required
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <span className={validPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="iconWithAction"
                  onClick={clearPassword}
                />
              </span>
            </div>
            <p
              id="pwdnote"
              className={
                password && !validPassword ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special characters: !@#$%
            </p>
            <div className="formField">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                required
                id="confirmPassword"
                value={matchPassword}
                placeholder="Confirm Password"
                onChange={(e) => setMatchPassword(e.target.value)}
                onFocus={() => setMatchPasswordFocus(true)}
                onBlur={() => setMatchPasswordFocus(false)}
              />
              <span
                className={
                  validMatchPassword && matchPassword ? "valid" : "hide"
                }
              >
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validPassword || !matchPassword ? "hide" : "invalid"}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="iconWithAction"
                  onClick={clearConfirmPassword}
                />
              </span>
            </div>
            <p
              id="confirmnote"
              className={
                matchPassword && !validMatchPassword
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              The passwords don't match!
            </p>
            <button
              className="extraMargins"
              disabled={
                (name && !validName) ||
                (email && !validEmail) ||
                (password && !validPassword) ||
                (matchPassword && !validMatchPassword)
                  ? true
                  : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Log in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import { useRef, useState, useEffect, FormEvent } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signUpWithEmailAndPassword } from "../utils/authentication"

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

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
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPassword(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, matchPassword]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrorMessage("Invalid entry!");
      return;
    }
    // create user ...
    signUpWithEmailAndPassword({email, password})
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <div>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </div>
      ) : (
        <div id="signUpForm">
          <h1>Sign Up</h1>
          <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"}>
            {errorMessage}
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email:
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              required
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="uidnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Your email address must have a valid format consisting of a username, followed by an '@' symbol, and a domain name. 
            </p>
            <label htmlFor="password">
              Password:
              <span className={validPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              required
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                passwordFocus && password && !validPassword
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special characters: !@#$%
            </p>
            <label htmlFor="confirmPassword">
              Confirm Password:
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
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              required
              id="confirmPassword"
              onChange={(e) => setMatchPassword(e.target.value)}
              onFocus={() => setMatchPasswordFocus(true)}
              onBlur={() => setMatchPasswordFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchPasswordFocus && matchPassword && !validMatchPassword
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              The passwords don't match!
            </p>
            <button
              disabled={
                !validEmail || !validPassword || !validMatchPassword
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
              {/*put router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default Signup;

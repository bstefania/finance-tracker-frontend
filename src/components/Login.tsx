import { FormEvent } from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { logInWithEmailAndPassword } from "../utils/authentication";
import AuthContext from "../context/AuthProvider";

export default function () {
  const { setAuth } = useContext(AuthContext)
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

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
    const accessToken = await logInWithEmailAndPassword({ email, password });
    setAuth({email, password, accessToken})
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <div>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </div>
      ) : (
        <div>
          <p ref={errRef} className={errMessage ? "errmsg" : "offscreen"}>
            {errMessage}
          </p>
          <h1>Log In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>Log In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </div>
      )}
    </>
  );
}

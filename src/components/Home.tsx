import { useNavigate, useLocation, Link } from "react-router-dom";
import { logOut } from "../utils/authentication";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Home = () => {
    // const navigate = useNavigate();
    // const location = useLocation()
    const axiosPrivate = useAxiosPrivate()

    const pingBackend = async () =>  {
        try {
            const res = await axiosPrivate.get("/")
            console.log(res)
        } catch(err) {
            console.log(err)
            // navigate("/login", {state: {from: location}, replace: true})
        }
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/balance">Go to the Balance page</Link>
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={pingBackend}>Ping backend</button>
            </div>
            <div className="flexGrow">
                <button onClick={logOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
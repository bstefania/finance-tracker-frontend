import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Log in</Link><br />
            <Link to="/signup">Sign up</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">Home</Link><br />
            <Link to="/balance">Balance</Link>
        </section>
    )
}

export default LinkPage
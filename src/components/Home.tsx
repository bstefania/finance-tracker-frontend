import { useNavigate, useLocation, Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/Home.css"

const Home = () => {
  // const navigate = useNavigate();
  // const location = useLocation()
  const axiosPrivate = useAxiosPrivate();

  const pingBackend = async () => {
    try {
      const res = await axiosPrivate.get("/");
      console.log(res);
    } catch (err) {
      console.log(err);
      // navigate("/login", {state: {from: location}, replace: true})
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <Navbar header="Home" />
        <div className="content">Content</div>
      </div>
    </div>
  );
};

export default Home;

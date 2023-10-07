import { Outlet } from "react-router-dom";
import Navbar from "../molecules/Navbar";

const Layout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Layout;

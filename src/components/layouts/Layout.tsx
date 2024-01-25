import { Outlet } from "react-router-dom";
import Notification from "../atoms/Notification";

const Layout = () => {
  return (
    <main className="App">
      <Notification />
      <Outlet />
    </main>
  );
};

export default Layout;

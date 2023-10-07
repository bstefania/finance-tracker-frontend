import "./App.scss";
import Login from "./pages/Login"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/organisms/Layout";
import Missing from "./pages/Missing";
import Wallet from "./pages/Wallet";
import Home from "./pages/Home";
import RequireAuth from "./components/utils/RequireAuth";
import LinkPage from "./pages/LinkPage";
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        { /* public routes */}
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>
        <Route path="linkpage" element={<LinkPage />}/>
        {/* <Route path="unauthorized" element={<Unauthorized />}/> */}

        { /* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />}/>
          <Route path="wallet" element={<Wallet />}/>
        </Route>

        <Route path="missing" element={<Missing />}/>
      </Route>
    </Routes>
  );
}


export default App;

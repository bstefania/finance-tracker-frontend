import "./App.css";
import Login from "./components/Login"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Balance from "./components/Balance";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import LinkPage from "./components/LinkPage";
import Signup from './components/Signup';

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
          <Route path="balance" element={<Balance />}/>
        </Route>

        <Route path="missing" element={<Missing />}/>
      </Route>
    </Routes>
  );
}


export default App;

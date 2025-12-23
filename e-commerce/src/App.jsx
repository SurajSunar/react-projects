import "./App.css";
import "animate.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import Login from "./components/login/Login";
import Authguard from "./components/guard/Authguard";
import Layout from "./components/admin/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={Authguard}>
            <Route path="/login" Component={Login} />
            <Route path="/admin" Component={Layout}>
              <Route path="dashboard" Component={Dashboard} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

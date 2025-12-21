import "./App.css";
import "animate.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import Login from "./components/login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/admin">
            <Route path="dashboard" Component={Dashboard} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

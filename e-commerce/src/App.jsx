import "./App.css";
import "animate.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import Login from "./components/login/Login";
import Authguard from "./components/guard/Authguard";
import Layout from "./components/admin/Layout";
import Customer from "./components/admin/Customer";
import Order from "./components/admin/Order";
import Product from "./components/admin/Product";
import Settings from "./components/admin/Settings";
import NotFound from "./404";
import Signup from "./components/signup/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={Authguard}>
            <Route path="/login" Component={Login} />
            <Route path="/admin" Component={Layout}>
              <Route path="dashboard" Component={Dashboard} />
              <Route path="customers" Component={Customer} />
              <Route path="orders" Component={Order} />
              <Route path="products" Component={Product} />
              <Route path="Settings" Component={Settings} />
            </Route>
          </Route>
          <Route path="/signup" Component={Signup} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

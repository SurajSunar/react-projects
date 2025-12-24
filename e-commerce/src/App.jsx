import "./App.css";
import "animate.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import Login from "./components/login/Login";
import Authguard from "./components/guard/Authguard";
import Customer from "./components/admin/Customer";
import Order from "./components/admin/Order";
import Product from "./components/admin/Product";
import Settings from "./components/admin/Settings";
import NotFound from "./404";
import Signup from "./components/signup/Signup";
import Home from "./components/home/home";
import AdminLayout from "./components/admin/AdminLayout";
import UserLayout from "./components/user/UserLayout";
import UserOrder from "./components/user/UserOrder";
import UserSettings from "./components/user/UserSettings";
import UserCart from "./components/user/UserCart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={Authguard}>
            <Route path="/login" Component={Login} />
            <Route path="/" Component={UserLayout}>
              <Route path="" Component={Home} />
              <Route path="carts" Component={UserCart} />
              <Route path="orders" Component={UserOrder} />
              <Route path="settings" Component={UserSettings} />
            </Route>
            <Route path="/admin" Component={AdminLayout}>
              <Route path="" Component={Dashboard} />
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

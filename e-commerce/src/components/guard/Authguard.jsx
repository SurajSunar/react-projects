import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../zustand/useAuth";
import { Loader2 } from "lucide-react";

const Authguard = () => {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const validateUser = async () => {
      try {
        setIsLogin(!!user?.token);
      } catch (error) {
        console.log(error);
        setIsLogin(false);
      }
    };

    validateUser();
  }, [user]);

  if (isLogin === null) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  } else if (isLogin === true) {
    return window.location.pathname === "/login" ? (
      <Navigate to={"/admin/dashboard"} />
    ) : (
      <Outlet />
    );
  } else {
    return window.location.pathname === "/login" ? (
      <Outlet />
    ) : (
      <Navigate to={"login"} />
    );
  }
};

export default Authguard;

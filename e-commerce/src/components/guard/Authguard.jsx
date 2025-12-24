import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../zustand/useAuth";
import { Loader2 } from "lucide-react";
import axios from "axios";

const Authguard = () => {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(null);
  const [role, setRole] = useState();
  const isAdmin = role === "admin";

  useEffect(() => {
    const validateUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/verify-token", {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        });

        setIsLogin(data.valid);
        setRole(data?.user?.role);
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
    if (isAdmin) {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/"
      ) {
        return <Navigate to={"/admin/dashboard"} />;
      } else {
        return <Outlet />;
      }
    } else {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname.includes("/admin")
      ) {
        return <Navigate to={"/"} />;
      } else {
        return <Outlet />;
      }
    }
  } else {
    return window.location.pathname === "/login" ? (
      <Outlet />
    ) : (
      <Navigate to={"login"} />
    );
  }
};

export default Authguard;

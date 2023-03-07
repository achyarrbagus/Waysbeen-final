import { ContextGlobal } from "../assets/context/Context";
import { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const { kumpulanState } = useContext(ContextGlobal);
  const { adminlogin, setAdminLogin } = kumpulanState;
  const isSignIn = adminlogin;

  return isSignIn === true ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;

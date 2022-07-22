import React from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import Login from "./components/Login";
import { store } from "./redux/store";

function PrivateRoutes() {
  const navigate = useNavigate();
  const getAdminToken = store.getState();
  const getToken = getAdminToken?.adminDetails?.adminInfo?.token;
  if (getToken) {
    return <Outlet />;
  } else {
    return <AdminLogin />;
  }
}

export default PrivateRoutes;

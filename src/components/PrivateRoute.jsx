import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
function PrivateRoute() {
  const { loggedIn, loading } = useAuthStatus();
  if (loading) {
    return <h2>Loading</h2>;
  }
  return loggedIn ? <Outlet /> : <Navigate to={"/sign-in"} />;
}

export default PrivateRoute;

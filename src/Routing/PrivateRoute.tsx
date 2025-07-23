import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;

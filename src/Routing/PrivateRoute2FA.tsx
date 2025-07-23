import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute2fa: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("temporaryToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute2fa;

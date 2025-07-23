import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRouteRecover: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("recoverEmail");

  if (!token) {
 
    return <Navigate to="/recover-1" replace />;
  }

  return <>{children}</>;
};

export default PrivateRouteRecover;

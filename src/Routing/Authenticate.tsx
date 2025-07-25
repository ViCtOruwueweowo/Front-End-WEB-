import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RedirectIfAuthenticatedProps {
  children: ReactNode;
}

const RedirectIfAuthenticated: React.FC<RedirectIfAuthenticatedProps> = ({ children }) => {
  const token = localStorage.getItem("jwt");

  if (token) {
    return <Navigate to="/index" replace />;
  }

  return <>{children}</>;
};

export default RedirectIfAuthenticated;

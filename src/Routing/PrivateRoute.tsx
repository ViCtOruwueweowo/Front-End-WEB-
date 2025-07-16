import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    // No hay token, redirige a login
    return <Navigate to="/" replace />;
  }
  // Hay token, muestra la ruta protegida
  return <>{children}</>;
};

export default PrivateRoute;

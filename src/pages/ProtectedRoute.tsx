import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/User";
import { UserRole } from "../types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string; // Add a redirectTo prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = "/", // Default to home page
}) => {
  const { currentUser } = useUserContext();

  if (!currentUser) {
    return <Navigate to="/login" replace />; // Use replace to avoid back button issues
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to={redirectTo} replace />; // Redirect to specified path
  }

  return <>{children}</>;
};

export default ProtectedRoute;

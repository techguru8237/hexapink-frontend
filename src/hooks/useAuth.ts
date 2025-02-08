import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const login = (token: string, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", user.name);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;

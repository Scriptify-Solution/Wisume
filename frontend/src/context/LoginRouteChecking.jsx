import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginRouteChecking = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default LoginRouteChecking;

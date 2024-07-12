import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../store/Store";

const AuthGuard = ({ children }) => {
  const { user } = useStore();
  const location = useLocation();

  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default AuthGuard;

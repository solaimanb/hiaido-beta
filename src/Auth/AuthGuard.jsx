import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../store/Store";

const AuthGuard = ({ children }) => {
  const { user } = useStore();
  const location = useLocation();

  if (!user?.isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default AuthGuard;

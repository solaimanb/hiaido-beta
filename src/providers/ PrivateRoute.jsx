import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authStatus === "authenticated" ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

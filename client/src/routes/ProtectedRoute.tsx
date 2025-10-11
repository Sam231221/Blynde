import { Outlet, Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useUser } from "../redux/reducers/AuthSlice";

type ProtectedRouteProps = {
  children?: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useUser();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={`/auth/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children ? children : <Outlet />;
}

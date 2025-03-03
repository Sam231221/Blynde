import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { selectUser } from "../redux/reducers/AuthSlice";
import { ReactNode } from "react";

type ProtectedRouteProps = {
  children?: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAppSelector(selectUser);
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

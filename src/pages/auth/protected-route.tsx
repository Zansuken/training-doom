import { Navigate, Outlet, useLocation } from "react-router-dom";
import { FC } from "react";
import Loading from "../loading";
import { useAppContext } from "@/context";

const ProtectedRoute: FC = () => {
  const location = useLocation();
  const { isAppLoading, user } = useAppContext();

  if (isAppLoading) return <Loading />;

  if (!user) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

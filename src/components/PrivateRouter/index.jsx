import { Navigate, Outlet } from "react-router";
// import { useAuth } from "../AuthContext";

export default function PrivateRouter({ redirect = "/" }) {
  // const { user } = useAuth();
  // if (!user) return <Navigate to={redirect} />;
  return <Outlet />;
}

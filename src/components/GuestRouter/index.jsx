import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function GuestRouter({ redirect = "/" }) {
  const { user } = useAuth();
  if (user) return <Navigate to={redirect} />;
  return <Outlet />;
}

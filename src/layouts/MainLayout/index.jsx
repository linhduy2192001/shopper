import React from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}

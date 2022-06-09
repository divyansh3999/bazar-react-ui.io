import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./admin/component/AdminNavbar";
import AdminSidebar from "./admin/component/AdminSidebar";
import SidebarContent from "./admin/component/SidebarContent";

import "./admin/css/styles.css";

export default function Layout() {
  return (
    <>
      <div className="sb-nav-fixed">
        <AdminNavbar></AdminNavbar>
        <div id="layoutSidenav">
          <AdminSidebar></AdminSidebar>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

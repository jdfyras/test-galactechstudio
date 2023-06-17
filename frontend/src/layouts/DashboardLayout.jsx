import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Navigate, useOutlet } from "react-router-dom";

function DashboardLayout() {
  const navigate = useNavigate();
  if (localStorage.getItem("isConnected") && localStorage.getItem("userId"))
    return (
      <div>
        <Navbar />
        <div className="main-container" id="container">
          <div id="content" className="main-content">
            <div className="layout-px-spacing">
              <Outlet />
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  else return <Navigate to="/login" />;
}

export default DashboardLayout;

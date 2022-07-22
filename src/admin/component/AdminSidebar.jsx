import React from "react";
import { Link } from "react-router-dom";
import { store } from "../../redux/store";

export default function AdminSidebar() {
  const adminInfo = store.getState();
  const admin_name = adminInfo?.adminDetails?.adminInfo?.admin?.admin_name;
  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <Link className="nav-link" to="/admin">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </Link>
              <div className="sb-sidenav-menu-heading">Details</div>
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-columns"></i>
                </div>
                Product Details
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link to="/all-products" className="nav-link">
                    All Products
                  </Link>
                  <Link to="/add-products" className="nav-link">
                    Add Products
                  </Link>
                </nav>
              </div>
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded="false"
                aria-controls="collapsePages"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                Category Details
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="collapsePages"
                aria-labelledby="headingTwo"
                data-bs-parent="#sidenavAccordion"
              >
                <nav
                  className="sb-sidenav-menu-nested nav accordion"
                  id="sidenavAccordionPages"
                >
                  <Link to="/all-category" className="nav-link">
                    All Category
                  </Link>
                  <Link to="/add-category" className="nav-link">
                    Add Category
                  </Link>
                </nav>
              </div>
              <div className="sb-sidenav-menu-heading">Users Information</div>
              <Link to="/all-users" className="nav-link">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users"></i>
                </div>
                All Users
              </Link>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            {admin_name}
          </div>
        </nav>
      </div>
    </>
  );
}

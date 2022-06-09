import React from 'react'
import { Link } from "react-router-dom";

export default function SidebarContent() {
  return (
    <>
        <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Dashboard</h1>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                      <div className="card-body">All Products</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <Link className="small text-white stretched-link" to="/all-products">
                          View Products
                        </Link>
                        <div className="small text-white">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-warning text-white mb-4">
                      <div className="card-body">Add Products</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <Link className="small text-white stretched-link" to="/add-products">
                          View Details
                        </Link>
                        <div className="small text-white">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                      <div className="card-body">Add Category</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <Link className="small text-white stretched-link" to="/add-category">
                          View Details
                        </Link>
                        <div className="small text-white">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-danger text-white mb-4">
                      <div className="card-body">All Users</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <Link className="small text-white stretched-link" to="/all-users">
                          View Details
                        </Link>
                        <div className="small text-white">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header">
                        <i className="fas fa-chart-area me-1"></i>
                        All Products
                      </div>
                      <div className="card-body">
                        <canvas
                          id="myAreaChart"
                          width="100%"
                          height="40"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header">
                        <i className="fas fa-user fa-fw"></i>
                        All Users
                      </div>
                      <div className="card-body">
                        <canvas
                          id="myBarChart"
                          width="100%"
                          height="40"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
                    Copyright &copy; Your Website 2022
                  </div>
                  <div>
                    <a href="#">Privacy Policy</a>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
    </>
  )
}

import React from "react";

export default function AllUsers() {
  return (
    <>
      <div id="layoutSidenav_content">
        <h1 className="text-center py-5">All Users</h1>
        <main>
          <div className="container col-xl-12 col-xxl-10 px-4">
            <div className="row align-items-center g-lg-5">
              <div className="col-md-10 mx-auto col-lg-10">
                <table className="table table-striped productTable">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Users Name</th>
                      <th scope="col">Users Email</th>
                      <th scope="col">Users Image</th>
                      <th scope="col">Users Phone</th>
                      <th scope="col">Users Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
                          className="productRoundImage"
                        />
                      </td>
                      <td>123456789</td>
                      <td>
                        <button className="btn btn-primary mx-2">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-danger">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
  );
}

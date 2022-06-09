import axios from "axios";
import React, { useEffect, useState } from "react";
import "../admin/css/modal.css";
import { ShowProducts } from "../admin/GetApi";
import { store } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../redux/actions/productAction"

export default function AllProducts() {
    ShowProducts();
  // const products = useSelector(
  //   (state) => state.productDetails.productInfo.product
  // );
  // console.log("products", products);

  const dispatch = useDispatch();

  const getProducts = store.getState();
  console.log("get", getProducts);
  const [modal, setModal] = useState("modal");
  const deleteProduct = async (delId) => {
    setModal(modal);
    await axios
      .delete(`http://127.0.0.1:8000/api/destroy/${delId}`)
      .then((response) => {
        console.log("response");
        dispatch(removeProduct(response));
        console.log(response);

      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div id="layoutSidenav_content">
        <h1 className="text-center py-5">All Products</h1>
        <main>
          <div className="container col-xl-12 col-xxl-10 px-4">
            <div className="row align-items-center g-lg-5">
              <div className="col-md-10 mx-auto col-lg-10">
                <table className="table table-striped productTable">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Product Category</th>
                      <th scope="col">Product Image</th>
                      <th scope="col">Product Price</th>
                      <th scope="col">Product Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getProducts.productDetails.productInfo.status ? (
                      getProducts?.productDetails?.productInfo?.product.map(
                        (product, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{product.product_name}</td>
                            <td>{product.category_name}</td>
                            <td>
                              <img
                                src={`http://127.0.0.1:8000/uploads/product/${product.product_image}`}
                                className="productRoundImage"
                              />
                            </td>
                            <td>Rs. {product.product_price}</td>
                            <td>
                              <button className="btn btn-primary mx-2">
                                <i className="fas fa-edit"></i>
                              </button>
                              <a
                                className="btn btn-danger"
                                href={`#myModal${index}`}
                                data-toggle="modal"
                              >
                                <i className="fas fa-trash"></i>
                              </a>
                            </td>
                            <div
                              id={`myModal${index}`}
                              className="modal fade"
                              // data-dismiss="modal"
                            >
                              <div className="modal-dialog modal-confirm">
                                <div className="modal-content">
                                  <div className="modal-header flex-column">
                                    <div className="icon-box">
                                      <i className="material-icons">&#xE5CD;</i>
                                    </div>
                                    <h4 className="modal-title w-100">
                                      Are you sure?
                                    </h4>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-hidden="true"
                                    >
                                      &times;
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <p>
                                      Do you really want to delete this product?
                                      This process cannot be undone.
                                    </p>
                                  </div>
                                  <div className="modal-footer justify-content-center">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger shadow-none border-0 outline-none"
                                      onClick={() => deleteProduct(product.id)}
                                      data-dismiss={modal}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          {getProducts.productDetails.productInfo.message}
                        </td>
                      </tr>
                    )}
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
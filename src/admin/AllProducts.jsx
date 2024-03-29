import axios from "axios";
import React, { useState } from "react";
import "../admin/css/modal.css";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "react-query";
import { store } from "../redux/store";
import { Button, Modal, Form } from "react-bootstrap";
import { productData } from "../redux/actions/productAction";
import { useDispatch } from "react-redux";

export default function AllProducts() {
  const [modal, setModal] = useState("modal");
  const [data, setData] = useState();
  const [productId, setProductId] = useState();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  // form state
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");

  // modal show

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // get category data from redux
  const categoryState = store.getState();
  const categoryData = categoryState?.categoryDetails?.cateInfo?.data;
  const categoryStatus = categoryState?.categoryDetails?.cateInfo?.status;

  // show all data
  const fetchProduct = async () => {
    setIsLoading(true);
    await axios
      .get("http://127.0.0.1:8000/api/all-products")
      .then((response) => {
        setData(response);
        setIsLoading(false);
        dispatch(productData(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // remove product data
  const removeProduct = async (delId) => {
    setModal(modal);
    await axios
      .delete(`http://127.0.0.1:8000/api/destroy/${delId}`)
      .then((response) => {
        fetchProduct();
        toast.success(response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
        });
      })
      .catch((error) => {
        toast.danger(error?.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
        });
      });
  };

  // open modal and show product detail
  const productDetail = async (productID) => {
    handleShow();
    await axios
      .get(`http://127.0.0.1:8000/api/edit/${productID}`)
      .then((response) => {
        setShow("show");
        setProductId(response?.data?.product?.id);
        setProductName(response?.data?.product?.product_name);
        setCategoryId(response?.data?.product?.category_id);
        setProductImage(response?.data?.product?.product_image);
        setProductPrice(response?.data?.product?.product_price);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // update data
  const updateProduct = async (e) => {
    e.preventDefault();
    const updateData = {
      product_name: productName,
      category_id: categoryId,
      product_image: productImage,
      product_price: productPrice,
    };

    await axios
      .post(`http://127.0.0.1:8000/api/update/${productId}`, updateData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success(response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
        });

        handleClose();

        fetchProduct();
      })
      .catch((error) => {
        toast.error(error?.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
        });
      });
  };

  const { mutate } = useMutation(updateProduct);
  const [file, setFile] = useState();
  const [fileCheck, setFileCheck] = useState(false);
  function handleChange(e) {
    console.log(e.target.files);
    setFileCheck(true);
    setFile(URL.createObjectURL(e.target.files[0]));
    setProductImage(e.target.files[0]);
  }

  // loader

  return (
    <>
      <div id="layoutSidenav_content">
        <h1 className="text-center py-5">All Product's</h1>
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
                    {isLoading ? (
                      <td colSpan={6}>
                        <div className="box">
                          <div className="boxChild">
                            <span className="circle"></span>
                            <span className="circle"></span>
                            <span className="circle"></span>
                            <span className="circle"></span>
                          </div>
                        </div>
                      </td>
                    ) : (
                      <>
                        {data?.data?.status ? (
                          data?.data?.product.map((product, index) => (
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
                                <button
                                  className="btn btn-primary mx-2"
                                  onClick={() => productDetail(product?.id)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <a
                                  className="btn btn-danger"
                                  href={`#myModal`}
                                  data-toggle="modal"
                                >
                                  <i className="fas fa-trash"></i>
                                </a>
                              </td>

                              <td>
                                <div id={`myModal`} className="modal fade">
                                  <div className="modal-dialog modal-confirm">
                                    <div className="modal-content">
                                      <div className="modal-header flex-column">
                                        <div className="icon-box">
                                          <i className="material-icons">
                                            &#xE5CD;
                                          </i>
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
                                          Do you really want to delete this
                                          product? This process cannot be
                                          undone.
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
                                          onClick={() =>
                                            removeProduct(product.id)
                                          }
                                          data-dismiss={modal}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                      
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} style={{ textAlign: "center" }}>
                              {data?.data?.message}
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Products</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={mutate}>
                <Form.Group className="mb-3" controlid="formBasicName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="product_name"
                    placeholder="name@example.com"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlid="formBasicCategory">
                  <Form.Select
                    className="form-select productDetails"
                    aria-label="Default select example"
                    name="category_id"
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option>Select Category</option>
                    {categoryStatus != false
                      ? categoryData.map((category, index) => {
                          return (
                            <option key={index} value={category.id}>
                              {category.category_name}
                            </option>
                          );
                        })
                      : "no category"}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mb-3 profile-pic-holder"
                  controlid="formBasicImage"
                >
                  <Form.Label htmlFor="upload-button">
                    Update Product Image
                    <img
                      id="product_update_image"
                      className="product_update_image"
                      alt="product_update_image"
                      src={
                        fileCheck
                          ? file
                          : `http://127.0.0.1:8000/uploads/product/${productImage}`
                      }
                    />
                  </Form.Label>
                  <Form.Control
                    id="upload-button"
                    accept="image/*"
                    type="file"
                    className="uploadProfileInput d-none form-control"
                    name="product_image"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlid="formBasicPrice">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Product Price"
                    name="product_price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
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
        <ToastContainer />
      </div>
    </>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllCategory() {
  const [data, setData] = useState();
  const [modal, setModal] = useState("modal");
  const [isLoading, setIsLoading] = useState(false);

  //   category state
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryId, setCategoryId] = useState();

  // <----------- fetch category data ----------->
  const fetchCategory = async () => {
    setIsLoading(true);
    var url = "http://127.0.0.1:8000/api/show-category";
    await axios
      .get(url)
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // remove product data
  const removeCategory = async (delId) => {
    setModal(modal);
    await axios
      .delete(`http://127.0.0.1:8000/api/delete-category/${delId}`)
      .then((response) => {
        fetchCategory();
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

  // modal show
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   show edit details and open modal for update data
  const editCategory = async (categoryID) => {
    await axios
      .get(`http://127.0.0.1:8000/api/edit-category/${categoryID}`)
      .then((response) => {
        setCategoryId(response?.data?.category?.id);
        setCategoryName(response?.data?.category?.category_name);
        setCategoryImage(response?.data?.category?.category_image);
        handleShow();
      })
      .catch((error) => console.log(error));
  };

  //   update category data
  const updateCategory = async (e) => {
    e.preventDefault();
    const updateData = {
      category_name: categoryName,
      category_image: categoryImage,
    };

    await axios
      .post(
        `http://127.0.0.1:8000/api/update-category/${categoryId}`,
        updateData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        handleClose();
        fetchCategory();
        toast.success(response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
        });
      })
      .catch((error) => {
        toast.error(error?.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
        });
      });
  };

  const { mutate } = useMutation(updateCategory);
  const [file, setFile] = useState();
  const [fileCheck, setFileCheck] = useState(false);
  function handleChange(e) {
    console.log(e.target.files);
    setFileCheck(true);
    setFile(URL.createObjectURL(e.target.files[0]));
    setCategoryImage(e.target.files[0]);
  }
  return (
    <>
      <div id="layoutSidenav_content">
        <h1 className="text-center py-5">All Category's</h1>
        <main>
          <div className="container col-xl-12 col-xxl-10 px-4">
            <div className="row align-items-center g-lg-5">
              <div className="col-md-10 mx-auto col-lg-10">
                <table className="table table-striped productTable">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Category Image</th>
                      <th scope="col">Category Action</th>
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
                          data?.data?.data?.map((category, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{category.category_name}</td>
                              <td>
                                <img
                                  src={`http://127.0.0.1:8000/uploads/category/${category.category_image}`}
                                  className="productRoundImage"
                                />
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary mx-2"
                                  onClick={() => editCategory(category?.id)}
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
                                          category? This process cannot be
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
                                            removeCategory(category.id)
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
                              {data?.data?.error}
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

          {/* <---------- update modal ---------> */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Category's</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={mutate}>
                <Form.Group className="mb-3" controlid="formBasicName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="category_name"
                    placeholder="name@example.com"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 profile-pic-holder"
                  controlid="formBasicImage"
                >
                  <Form.Label htmlFor="upload-button">
                    Update Category Image
                    <img
                      id="category_update_image"
                      className="product_update_image"
                      alt="category_update_image"
                      src={
                        fileCheck
                          ? file
                          : `http://127.0.0.1:8000/uploads/category/${categoryImage}`
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

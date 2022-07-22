import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllUsers() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // update data state
  const [updateUserId, setUpdateUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // modal show
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userData = async () => {
    setIsLoading(true);
    await axios
      .get("http://127.0.0.1:8000/api/show-users")
      .then((response) => {
        // console.log(response);
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userData();
  }, []);

  const removeUser = async (userDelId) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/delete-user/${userDelId}`)
      .then((response) => {
        userData();
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

  // open modal and show user detail
  const userDetails = async (userId) => {
    handleShow();
    await axios
      .get(`http://127.0.0.1:8000/api/edit-user/${userId}`)
      .then((response) => {
        console.log(response);
        setUpdateUserId(response?.data?.user?.id);
        setName(response?.data?.user?.name);
        setEmail(response?.data?.user?.email);
        setProfileImage(response?.data?.user?.profile_image);
        setPhoneNumber(response?.data?.user?.phone_number);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // update data
  const updateProduct = async (e) => {
    e.preventDefault();
    const updateData = {
      name: name,
      email: email,
      profile_image: profileImage,
      phone_number: phoneNumber,
    };

    await axios
      .post(
        `http://127.0.0.1:8000/api/update-user/${updateUserId}`,
        updateData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        handleClose();
        userData();
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

  const { mutate } = useMutation(updateProduct);
  const [file, setFile] = useState();
  const [fileCheck, setFileCheck] = useState(false);
  
  function handleChange(e) {
    console.log(e.target.files);
    setFileCheck(true);
    setFile(URL.createObjectURL(e.target.files[0]));
    setProfileImage(e.target.files[0]);
  }

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
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Profile Image</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Action's</th>
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
                          data?.data?.data?.map((users, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{users?.name}</td>
                              <td>{users?.email}</td>
                              <td>
                                <img
                                  src={`http://127.0.0.1:8000/uploads/users/${users?.profile_image}`}
                                  className="productRoundImage"
                                />
                              </td>
                              <td>{users?.phone_number}</td>
                              <td>
                                <button
                                  className="btn btn-primary mx-2"
                                  onClick={() => userDetails(users?.id)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <a
                                  className="btn btn-danger"
                                  href="#myModal"
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
                                          user? This process cannot be undone.
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
                                          onClick={() => removeUser(users?.id)}
                                          data-dismiss="modal"
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
        </main>
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
                  name="name"
                  placeholder="name@example.com"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlid="formBasicName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  name="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3 profile-pic-holder"
                controlid="formBasicImage"
              >
                <Form.Label htmlFor="upload-button">
                  Update Profile Image
                  <img
                    id="profile_update_image"
                    className="product_update_image"
                    alt="profile_update_image"
                    src={
                      fileCheck
                        ? file
                        : `http://127.0.0.1:8000/uploads/users/${profileImage}`
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
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Phone Number"
                  name="phone_number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
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

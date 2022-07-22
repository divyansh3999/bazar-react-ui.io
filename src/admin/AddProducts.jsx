import axios from "axios";
import React from "react";
import { store } from "../redux/store";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShowCategory } from "../admin/GetApi";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
    ShowCategory();

    const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const categoryState = store.getState();
  const categoryData = categoryState?.categoryDetails?.cateInfo?.data;
  const categoryStatus = categoryState?.categoryDetails?.cateInfo?.status;

  // add products
  const categoryFormData = (categoryData) => {
    var formData = new FormData();
    formData.append("product_name", categoryData.product_name);
    formData.append("category_id", categoryData.category_id);
    formData.append("product_image", categoryData.product_image[0]);
    formData.append("product_price", categoryData.product_price);
    formData.append("product_description", categoryData.product_description);

    axios
      .post("http://127.0.0.1:8000/api/add-products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
        });
        navigate("/all-products");
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
        });
      });
  };

  const { mutate } = useMutation(categoryFormData);
  return (
    <>
      <div id="layoutSidenav_content">
        <h1 className="text-center py-5">Add Product's</h1>
        <main>
          <div className="container col-xl-10 col-xxl-8 px-4">
            <div className="row align-items-center g-lg-5">
              <div className="col-md-10 mx-auto col-lg-10">
                <form
                  className="p-4 p-md-5 border rounded-3 bg-light"
                  onSubmit={handleSubmit(mutate)}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          className="form-control productDetails"
                          id="exampleFormControlInput1"
                          placeholder="Product name"
                          name="product_name"
                          {...register("product_name")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Product Category
                      </label>
                      <select
                        className="form-select productDetails"
                        aria-label="Default select example"
                        name="category_id"
                        {...register("category_id")}
                      >
                        <option defaultValue="">Select Category</option>
                        {categoryStatus != false ?
                        categoryData.map((category, index) => {
                          return (
                            <option key={index} value={category.id}>
                              {category.category_name}
                            </option>
                          );
                        }) : <option>No Category Found
                      </option>}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="formFileMultiple"
                          className="form-label"
                        >
                          Product Image
                        </label>
                        <input
                          className="form-control productDetails"
                          type="file"
                          id="formFileMultiple"
                          multiple
                          name="product_image"
                          {...register("product_image")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Product Price
                        </label>
                        <input
                          type="number"
                          className="form-control productDetails"
                          id="exampleFormControlInput1"
                          placeholder="Product price"
                          name="product_price"
                          {...register("product_price")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Product Description
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="product_description"
                      {...register("product_description")}
                    ></textarea>
                  </div>
                  <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit"
                  >
                    Add Products
                  </button>
                </form>
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
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { store } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCategory() { 
  const {register, handleSubmit } = useForm();
  const addCategoryData = (categoryData) =>{ 
    const cateFromData = new FormData();
    cateFromData.append("category_name", categoryData.category_name);
    cateFromData.append("category_image", categoryData.category_image[0]);
    axios.post("http://127.0.0.1:8000/api/add-category", cateFromData, {
      headers : {
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }).catch((error)=>{
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
  }

  const { mutate } = useMutation(addCategoryData);
  return (
    <>
      <div id="layoutSidenav_content">
        <h1 className="text-center py-5">Add Category</h1>
        <main>
          <div className="container col-xl-10 col-xxl-8 px-4">
            <div className="row align-items-center g-lg-5">
              <div className="col-md-10 mx-auto col-lg-10">
                
                <form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={handleSubmit(mutate)}>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control productDetails"
                      id="exampleFormControlInput1"
                      placeholder="Category name"
                      name="category_name"
                      {...register('category_name')}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="formFileMultiple" className="form-label">
                      Category Image
                    </label>
                    <input
                      className="form-control productDetails"
                      type="file"
                      id="formFileMultiple"
                      name="category_image"
                      multiple
                      {...register('category_image')}
                    />
                  </div>

                  <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit"
                  >
                    Add Catrgory
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

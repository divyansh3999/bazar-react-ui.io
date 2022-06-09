import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import Signup from "./components/Signup";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// admin routes
import Index from "./admin/Index";
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import AllProducts from "./admin/AllProducts";
import AddProducts from "./admin/AddProducts";
import AllUsers from "./admin/AllUsers";
import Layout from "./Layout";
import AddCategory from "./admin/AddCategory";
// import GetApi from "./admin/GetApi";

export default function PublicRoutes() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            {/* <Route  path="/getApi" element={<GetApi />} /> */}
            <Route exact path="/signupForm" element={<SignupForm />} />
            {/* admin routes */}
            <Route path="/" element={<Layout />}>
              <Route path="/admin" element={<Index />}></Route>
              <Route path="all-products" element={<AllProducts />}></Route>
              <Route path="add-products" element={<AddProducts />}></Route>
              <Route path="add-category" element={<AddCategory />}></Route>
              <Route path="all-users" element={<AllUsers />}></Route>
            </Route>
            <Route path="/admin-signup" element={<AdminSignup />}></Route>
            <Route path="/admin-login" element={<AdminLogin />}></Route>
          </Routes>
        </Router>
        <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

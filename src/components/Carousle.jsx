import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {
  cartsInfomation,
  cartsItemId,
  wishlistInformation,
} from "../redux/actions/productAction";
import "owl.carousel/dist/owl.carousel.min.js";
import { Container, Box, Typography, Paper, Grid } from "@mui/material";
import styled from "@emotion/styled";
import "../style.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { store } from "../redux/store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const UpperBox = styled("div")(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  position: "relative",
  height: "300px",
}));

const Sale = styled("div")(({ theme }) => ({
  backgroundColor: "#4BB4B4",
  position: "absolute",
  padding: "0px 10px",
  top: "20px",
  color: "#fff",
  fontSize: "13px",
}));

const ProductImg = styled("div")(({ theme }) => ({}));

const ProductContent = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "100px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "0px",
  },
  padding: "15px",
}));

// speedial cart
const actions = [
  { icon: <AddShoppingCartIcon />, name: "Add To Cart", cart: "cart" },
  { icon: <FavoriteIcon />, name: "Add To Wishlist" },
];

export default function Carousle() {
  const cartSelector = useSelector((state) => state);

  const options = {
    loop: true,
    margin: 10,
    responsiveClass: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // <--------- all products ---------->
  const reduxStore = store.getState();

  const productID = cartSelector?.wishlistInfo?.wishlistInfo?.map(
    (e) => e.product_id
  );


  const products = reduxStore?.productDetails?.productInfo?.data;

  // <----------- show cart ---------->
  const dispatch = useDispatch();
  const showCart = async () => {
    const user_id = reduxStore?.loginDetails?.loginInfo?.user?.id;
    await axios
      .get(`http://127.0.0.1:8000/api/all-cart-details/${user_id}`)
      .then((response) => {
        if (response?.data?.status == true) {
          dispatch(cartsInfomation(response?.data?.carts));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // <------------- show wishlist ------------->
  const wishlistShow = async () => {
    const user_id = reduxStore?.loginDetails?.loginInfo?.user?.id;
    await axios
      .get(`http://127.0.0.1:8000/api/all-wishlist-details/${user_id}`)
      .then((response) => {
        if (response?.data?.status == true) {
          dispatch(wishlistInformation(response?.data?.wishlist));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // <-------------- add-to-cart ------------>
  const handleCart = async (productId) => {
    let cartObj = {
      product_id: productId,
      user_id: reduxStore?.loginDetails?.loginInfo?.user?.id,
    };

    dispatch(cartsItemId(productId));

    if (reduxStore?.loginDetails?.loginInfo != "") {
      await axios
        .post("http://127.0.0.1:8000/api/add-to-cart", cartObj)
        .then((response) => {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            pauseOnHover: false,
          });
          showCart();
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            pauseOnHover: false,
          });
        });
    } else {
      toast.error("Please Login First", {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: false,
      });
    }
  };

  // <-------------- add-to-wishlist ------------>
  const handleWishlist = async (productId) => {
    let wishlistObj = {
      product_id: productId,
      user_id: reduxStore?.loginDetails?.loginInfo?.user?.id,
    };

    if (reduxStore?.loginDetails?.loginInfo != "") {
      await axios
        .post("http://127.0.0.1:8000/api/add-to-wishlist", wishlistObj)
        .then((response) => {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            pauseOnHover: false,
          });
          wishlistShow();
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            pauseOnHover: false,
          });
        });
    } else {
      toast.error("Please Login First", {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: false,
      });
    }
  };

  useEffect(() => {
    showCart();
    wishlistShow();
  }, []);

  return (
    <>
      <Box sx={{ padding: "50px 20px" }}>
        <Container maxWidth="xxl">
          <Box>
            <Typography variant="h4" component="h4" sx={{ fontWeight: "bold" }}>
              Top New Product
            </Typography>
            <Typography variant="p" sx={{ margin: "15px 0px" }} component="p">
              Tall blind but were, been folks not the expand
            </Typography>
          </Box>
          <OwlCarousel className="owl-theme productSlider" {...options}>
            {products?.status == true ? (
              products?.product?.map((product, index) => (
                <Box
                  sx={{ boxShadow: "0px 0px 5px #a8b9bd", margin: "10px" }}
                  key={index}
                >
                  <UpperBox>
                    <Sale>
                      <Typography variant="p" component="p">
                        5% Off
                      </Typography>
                    </Sale>
                    <ProductImg className="productImage">
                      <img
                        src={`http://127.0.0.1:8000/uploads/product/${product?.product_image}`}
                        alt=""
                      />
                    </ProductImg>
                  </UpperBox>
                  <ProductContent>
                    <Box>
                      <Typography variant="h5" component="h5">
                        {product?.product_name}
                      </Typography>
                      <Typography variant="p" component="p">
                        ${product?.product_price}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        height: 100,
                        transform: "translateZ(0px)",
                        flexGrow: 1,
                      }}
                    >
                      <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        className="bgColor"
                        sx={{ position: "absolute", bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon />}
                      >
                        {actions.map((action, index) =>
                          action.cart == "cart" ? (
                            <SpeedDialAction
                              key={action.name}
                              icon={action.icon}
                              tooltipTitle={action.name}
                              onClick={() => handleCart(product.id)}
                              className="cart-icon"
                            />
                          ) : (
                            <SpeedDialAction
                              key={action.name}
                              icon={action.icon}
                              tooltipTitle={action.name}
                              onClick={() => handleWishlist(product.id)}
                              sx={productID.map((e) =>
                                e == product.id ? {color: "#d33"} : ""
                              )}
                            />
                          )
                        )}
                      </SpeedDial>
                    </Box>
                  </ProductContent>
                </Box>
              ))
            ) : (
              // <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              //   <Grid item xs={6}>
              //     <Item>
              //       <Box
              //         sx={{ boxShadow: "0px 0px 5px #a8b9bd", margin: "10px" }}
              //       >
              //         <UpperBox className="upperBox">
              //           <CancelIcon
              //             color="primary"
              //             sx={{ height: "5em", width: "5em" }}
              //           ></CancelIcon>
              //           <Box>
              //             <Typography
              //               variant="h2"
              //               component="div"
              //               gutterBottom
              //               sx={{ fontWeight: "400", marginBottom: "0px" }}
              //             >
              //               No Produts Found
              //             </Typography>
              //           </Box>
              //         </UpperBox>
              //       </Box>
              //     </Item>
              //   </Grid>
              // </Grid>
              <h1>No Products</h1>
            )}
          </OwlCarousel>
        </Container>
      </Box>
    </>
  );
}

import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/owl.carousel.min.js";
import { Container, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { AddBox } from "@mui/icons-material";
import "../style.css";

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
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "100px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "0px",
  },
  padding: "15px",
}));

export default function CarouselTwo() {
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
  return (
    <Box sx={{ padding: "50px 20px" }}>
      <Container maxWidth="xxl">
        <Box>
          <Typography variant="h4" component="h4" sx={{fontWeight: "bold"}}>
            Top Selling Product
          </Typography>
          <Typography variant="p" sx={{margin: "15px 0px"}} component="p">
          Tall blind but were, been folks not the expand
          </Typography>
        </Box>
        <OwlCarousel className="owl-theme productSlider" {...options}>
          <Box sx={{ boxShadow: "0px 0px 5px #a8b9bd", margin: "10px" }}>
            <UpperBox>
              <Sale>
                <Typography variant="p" component="p">
                  5% Off
                </Typography>
              </Sale>
              <ProductImg className="productImage">
                <img
                  src="https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2FFurniture%20Shop%2FFurniture%20(7).png&w=1920&q=75"
                  alt=""
                />
              </ProductImg>
            </UpperBox>
            <ProductContent>
              <Box>
                <Typography variant="h5" component="h5">
                  Grey Sofa
                </Typography>
                <Typography variant="p" component="p">
                  $190.00
                </Typography>
              </Box>
              <Box>
                <AddBox></AddBox>
              </Box>
            </ProductContent>
          </Box>

          <Box sx={{ boxShadow: "0px 0px 5px #a8b9bd", margin: "10px" }}>
            <UpperBox>
              <Sale>
                <Typography variant="p" component="p">
                  5% Off
                </Typography>
              </Sale>
              <ProductImg className="productImage">
                <img
                  src="https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2FFurniture%20Shop%2FFurniture%20(8).png&w=1920&q=75"
                  alt=""
                />
              </ProductImg>
            </UpperBox>
            <ProductContent>
              <Box>
                <Typography variant="h5" component="h5">
                  Grey Sofa
                </Typography>
                <Typography variant="p" component="p">
                  $190.00
                </Typography>
              </Box>
              <Box>
                <AddBox></AddBox>
              </Box>
            </ProductContent>
          </Box>

          <Box sx={{ boxShadow: "0px 0px 5px #a8b9bd", margin: "10px" }}>
            <UpperBox>
              <Sale>
                <Typography variant="p" component="p">
                  5% Off
                </Typography>
              </Sale>
              <ProductImg className="productImage">
                <img
                  src="https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2FFurniture%20Shop%2FFurniture%20(9).png&w=1920&q=75"
                  alt=""
                />
              </ProductImg>
            </UpperBox>
            <ProductContent>
              <Box>
                <Typography variant="h5" component="h5">
                  Grey Sofa
                </Typography>
                <Typography variant="p" component="p">
                  $190.00
                </Typography>
              </Box>
              <Box>
                <AddBox></AddBox>
              </Box>
            </ProductContent>
          </Box>

          <Box sx={{ boxShadow: "0px 0px 5px #a8b9bd", margin: "10px" }}>
            <UpperBox>
              <Sale>
                <Typography variant="p" component="p">
                  5% Off
                </Typography>
              </Sale>
              <ProductImg className="productImage">
                <img
                  src="https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2FFurniture%20Shop%2FFurniture.png&w=1920&q=75"
                  alt=""
                />
              </ProductImg>
            </UpperBox>
            <ProductContent>
              <Box>
                <Typography variant="h5" component="h5">
                  Grey Sofa
                </Typography>
                <Typography variant="p" component="p">
                  $190.00
                </Typography>
              </Box>
              <Box>
                <AddBox></AddBox>
              </Box>
            </ProductContent>
          </Box>

          <Box sx={{ boxShadow: "0px 0px 5px #a8b9bd", margin: "10px" }}>
            <UpperBox>
              <Sale>
                <Typography variant="p" component="p">
                  5% Off
                </Typography>
              </Sale>
              <ProductImg className="productImage">
                <img
                  src="https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2FFurniture%20Shop%2FFurniture%20(4).png&w=1920&q=75"
                  alt=""
                />
              </ProductImg>
            </UpperBox>
            <ProductContent>
              <Box>
                <Typography variant="h5" component="h5">
                  Grey Sofa
                </Typography>
                <Typography variant="p" component="p">
                  $190.00
                </Typography>
              </Box>
              <Box>
                <AddBox></AddBox>
              </Box>
            </ProductContent>
          </Box>
        </OwlCarousel>
      </Container>
    </Box>
  );
}

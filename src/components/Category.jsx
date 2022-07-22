import React from "react";
import "../style.css";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  Home,
  EmojiEventsOutlined,
  ShowChartOutlined,
  ListOutlined,
  ChairAltOutlined,
  LivingOutlined,
  Light,
  Weekend,
  Living,
  TableBar,
  BrunchDining,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { store } from "../redux/store";

const CategoryBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.categoryColor.main,
  padding: "20px",
}));
const ProductBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.categoryColor.main,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 30px",
  marginBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    textAlign: "center",
  },
}));

const NewProductBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.categoryColor.main,
  textAlign: "center",
  padding: "10px 30px",
  marginBottom: "20px",
}));

const BoxDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.categoryColor.main,
  textAlign: "center",
  padding: "10px 30px",
  marginBottom: "20px",
}));

export default function Category() {
  const category = store.getState();
  const allCategory = category?.categoryDetails?.cateInfo?.data;
  return (
    <>
      <Box sx={{ padding: "50px 20px" }}>
        <Container maxWidth="xxl">
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{ display: { xs: "none", sm: "block" } }}>
              <CategoryBox>
                <List>
                  <Typography
                    sx={{
                      display: { xs: "none", sm: "block" },
                      borderBottom: "2px dashed #4BB4B4",
                      marginBottom: "10px",
                      paddingBottom: "5px",
                    }}
                    variant="p"
                    component="p"
                  >
                    Top Categories
                  </Typography>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "40px" }}>
                        <Home />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "40px" }}>
                        <EmojiEventsOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Popular Products" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "40px" }}>
                        <ShowChartOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Trending Products" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "40px" }}>
                        <ListOutlined />
                      </ListItemIcon>
                      <ListItemText primary="All Products" />
                    </ListItemButton>
                  </ListItem>
                  <Typography
                    sx={{
                      display: { xs: "none", sm: "block" },
                      borderBottom: "2px dashed #4BB4B4",
                      marginBottom: "10px",
                      padding: "10px 0px",
                    }}
                    variant="p"
                    component="p"
                  >
                    Top Categories
                  </Typography>
                  {allCategory?.map((category, index) => (
                        <ListItem disablePadding key={index}>
                          <ListItemButton>
                            <ListItemIcon sx={{ minWidth: "40px" }}>
                              <ChairAltOutlined />
                            </ListItemIcon>
                            <ListItemText primary={category.category_name} />
                          </ListItemButton>
                        </ListItem>
                    )
                  )}
                </List>
              </CategoryBox>
            </Grid>
            <Grid item xs={12} md={5}>
              <ProductBox>
                <Box>
                  <Typography variant="p" component="p">
                    Modern Furniture
                  </Typography>
                  <Typography variant="h4" component="h4">
                    Big Sale
                  </Typography>
                  <Typography variant="h5" component="h5">
                    UP TO 50% OFF
                  </Typography>
                  <Typography variant="p" component="p">
                    Shop Now
                  </Typography>
                </Box>
                <Box className="productImg">
                  <img
                    src="https://bazar-react.vercel.app/assets/images/Furniture%20Shop/Furniture%20(6).png"
                    alt=""
                  />
                </Box>
              </ProductBox>

              <BoxDiv>
                <Box>
                  <Typography variant="p" component="p">
                    Modern Furniture
                  </Typography>
                  <Typography variant="h4" component="h4">
                    Big Sale
                  </Typography>
                  <Typography variant="h5" component="h5">
                    UP TO 50% OFF
                  </Typography>
                  <Typography variant="p" component="p">
                    Shop Now
                  </Typography>
                </Box>
                <Box className="productImg">
                  <img
                    src="https://bazar-react.vercel.app/assets/images/Furniture%20Shop/Furniture%20(6).png"
                    alt=""
                  />
                </Box>
              </BoxDiv>
            </Grid>
            <Grid item xs={12} md={4}>
              <NewProductBox>
                <Box>
                  <Typography variant="p" component="p">
                    Sofa Collection
                  </Typography>
                  <Typography variant="h5" component="h5">
                    UP TO 60% OFF
                  </Typography>
                  <Typography variant="p" component="p">
                    Shop Now
                  </Typography>
                </Box>
                <Box className="productImg">
                  <img
                    src="https://bazar-react.vercel.app/assets/images/Furniture%20Shop/Furniture%20(5).png"
                    alt=""
                  />
                </Box>
              </NewProductBox>
              <ProductBox>
                <Box>
                  <Typography variant="p" component="p">
                    Modern Furniture
                  </Typography>

                  <Typography variant="h5" component="h5">
                    UP TO 50% OFF
                  </Typography>
                  <Typography variant="p" component="p">
                    Shop Now
                  </Typography>
                </Box>
                <Box className="productImg">
                  <img
                    src="https://bazar-react.vercel.app/assets/images/Furniture%20Shop/Furniture%20(4).png"
                    alt=""
                  />
                </Box>
              </ProductBox>
              <ProductBox>
                <Box>
                  <Typography variant="p" component="p">
                    Modern Furniture
                  </Typography>
                  <Typography variant="h5" component="h5">
                    UP TO 50% OFF
                  </Typography>
                  <Typography variant="p" component="p">
                    Shop Now
                  </Typography>
                </Box>
                <Box className="productImg">
                  <img
                    src="https://bazar-react.vercel.app/assets/images/Furniture%20Shop/Furniture%20(1).png"
                    alt=""
                  />
                </Box>
              </ProductBox>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

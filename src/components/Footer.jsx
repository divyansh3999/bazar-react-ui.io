import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import styled from "@emotion/styled";
import "../style.css";
import GooglePay from "./images/googlePay.png";
import AppStore from "./images/appStore.png";
import { Facebook, Google, Instagram, Twitter, YouTube } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box sx={{ padding: "50px 20px", backgroundColor: "#4BB4B4" }}>
      <Container maxWidth="xxl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              src="https://bazar-react.vercel.app/assets/images/logo.svg"
              alt=""
            />
            <Typography
              variant="p"
              sx={{ margin: "15px 0px", color: "#dddddd" }}
              component="p"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat
              et lectus vel ut sollicitudin elit at amet.
            </Typography>

            <Box className="imageFooter">
              <img src={GooglePay} alt="" />
              <img src={AppStore} alt="" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Help Center" sx={{ color: "#fff" }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemText
                    primary="Track Your Order"
                    sx={{ color: "#fff" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary="Corporate & Bulk Purchasing"
                    sx={{ color: "#fff" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemText
                    primary="Returns & Refunds"
                    sx={{ color: "#fff" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>

            <Box className="icons">
              <Facebook></Facebook>
              <Twitter></Twitter>
              <YouTube></YouTube>
              <Google></Google>
              <Instagram></Instagram>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

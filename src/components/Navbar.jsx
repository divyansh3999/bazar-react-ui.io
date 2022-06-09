import styled from "@emotion/styled";
import {
  Call,
  Markunread,
  PersonOutline,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import {
  alpha,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import "../style.css";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  minHeight: "48px!important",
});

const TopbarBox = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  margin: "0 15px 0 0",
  fontSize: "14px",
});

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  border: "1px solid #dddddd",
  borderRadius: "20px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#0F3460" }}>
        <StyledToolbar>
          <Stack direction="row">
            <TopbarBox>
              <Call sx={{ display: { xs: "none", sm: "block" } }}></Call>
              <Typography
                sx={{ display: { xs: "none", sm: "block" } }}
                variant="p"
                component="p"
              >
                +88012 3456 7894
              </Typography>
              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <img
                  src="https://bazar-react.vercel.app/assets/images/logo.svg"
                  alt=""
                />
              </Box>
            </TopbarBox>
            <TopbarBox sx={{ display: { xs: "none", sm: "block" } }}>
              <Markunread
                sx={{ display: { xs: "none", sm: "block" } }}
              ></Markunread>
              <Typography
                sx={{ display: { xs: "none", sm: "block" } }}
                variant="p"
                component="p"
              >
                support@ui-lib.com
              </Typography>
            </TopbarBox>
          </Stack>
          <Stack direction="row">
            <Typography
              color={"white"}
              sx={{ display: { xs: "none", sm: "block" } }}
              variant="p"
              component="p"
            >
              Theme FAQ's
            </Typography>
            <Typography
              mx={4}
              sx={{ display: { xs: "none", sm: "block" } }}
              color={"white"}
              variant="p"
              component="p"
            >
              Need Help?
            </Typography>
            <Typography mr={4} color={"white"} variant="p" component="p">
              EN
            </Typography>
            <Typography variant="p" color={"white"} component="p">
              USD
            </Typography>
          </Stack>
        </StyledToolbar>
      </Box>
      <Box
        sx={{
          padding: "25px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <img
              src="https://bazar-react.vercel.app/assets/images/logo2.svg"
              alt=""
            />
          </Box>
          <SearchBox>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Searching for…"
              inputProps={{ "aria-label": "search" }}
            />
            <Button
              sx={{
                position: "absolute",
                right: 0,
                padding: "7px 20px",
                borderRadius: "0 20px 20px 0px;",
              }}
              variant="contained"
              color="success"
            >
              Search
            </Button>
          </SearchBox>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Box className="loginBox">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              <IconButton aria-label="cart">
                <PersonOutline></PersonOutline>
              </IconButton>
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="secondary">
                  <ShoppingCart />
                </StyledBadge>
              </IconButton>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Navbar;

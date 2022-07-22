import styled from "@emotion/styled";
import { Call, Markunread, Search, ShoppingCart } from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PhoneIcon from "@mui/icons-material/Phone";
import { store } from "../redux/store";
import { loginStatus, cartsInfomation } from "../redux/actions/productAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const cartSelector = useSelector((state) => state?.cartsDetails?.carts);
  const unique = [];

  cartSelector.map((product) =>
    unique.filter((match) => match?.product?.id == product?.product?.id).length > 0
      ? null
      : unique.push(product)
  );  

  const reduxStore = store.getState();
  const cartID = reduxStore?.cartsDetails?.carts?.map((e) => e?.product?.id);

  const occurrences = cartID.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  const totalPrice = cartSelector.map((e) => e?.product?.product_price);

  // <--------- display cart --------->
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ paddingLeft: "25px" }}
        >
          Your Cart
        </Typography>
        <Typography
          variant="p"
          gutterBottom
          component="div"
          sx={{ paddingLeft: "25px", margin: "20px 0px" }}
        >
          Total Items : {cartSelector?.length}
        </Typography>
        {unique?.map((product, index) => (
          <Box key={index}>
            <ListItem disablePadding>
              <ListItemButton sx={{ justifyContent: "space-around" }}>
                <ListItemIcon>
                  <img
                    src={`http://127.0.0.1:8000/uploads/product/${product?.product?.product_image}`}
                    alt=""
                    width="80px"
                  />
                </ListItemIcon>
                <Box>
                  <ListItemText primary={product?.product?.product_name} />
                  <ListItemText
                    primary={`Rs.${product?.product?.product_price}`}
                  />
                </Box>
                <IconButton aria-label="delete" color="primary">
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
              <Typography
                variant="p"
                gutterBottom
                component="div"
                sx={{ paddingLeft: "25px", margin: "20px 0px" }}
              >
                {occurrences[product?.product?.id]}
              </Typography>
              <Divider />
            </ListItem>
            <hr />
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            paddingRight: "20px",
          }}
        >
          <Typography
            variant="p"
            gutterBottom
            component="div"
            sx={{ paddingLeft: "25px" }}
          >
            Total
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ paddingLeft: "25px" }}
          >
            Rs. {totalPrice.reduce((sum, a) => sum + a, 0)}
          </Typography>
        </Box>
      </List>
    </Box>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  // console.log(anchorEl);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // login information
  const loginInfo = store.getState();
  const loginDetails = loginInfo?.loginDetails?.loginInfo;

  const dispatch = useDispatch();
  // logout
  const navigate = useNavigate();
  const logout = () => {
    toast.success("Logout Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      pauseOnHover: false,
    });
    dispatch(loginStatus(""));
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };


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
              {!loginDetails?.token ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar
                        alt="Travis Howard"
                        src={`http://127.0.0.1:8000/uploads/users/${loginDetails?.user?.profile_image}`}
                      />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <Avatar
                        alt="Remy Sharp"
                        src={`http://127.0.0.1:8000/uploads/users/${loginDetails?.user?.profile_image}`}
                        sx={{ width: 24, height: 24 }}
                      />{" "}
                      {loginDetails?.user?.email}
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <PhoneIcon fontSize="small"></PhoneIcon>
                      </ListItemIcon>
                      +91-{loginDetails?.user?.phone_number}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={logout}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                  {/* end */}
                  {["right"].map((anchor) => (
                    <div key={anchor}>
                      <IconButton
                        aria-label="cart"
                        onClick={toggleDrawer(anchor, true)}
                      >
                        <StyledBadge
                          badgeContent={cartSelector?.length}
                          color="secondary"
                        >
                          <ShoppingCart />
                        </StyledBadge>
                      </IconButton>
                      <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                      >
                        {list(anchor)}
                      </Drawer>
                    </div>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Stack>
        <ToastContainer />
      </Box>
    </>
  );
};

export default Navbar;

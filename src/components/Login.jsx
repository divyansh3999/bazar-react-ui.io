import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import axios from "axios";
import { loginStatus, forgotStatus } from "../redux/actions/productAction";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SignInSide() {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addUserData = (loginData) => {
    axios
      .post("http://127.0.0.1:8000/api/login", loginData)
      .then((res) => {
        if (res?.data?.status == true) {
          dispatch(loginStatus(res.data));
          setTimeout(() => {
            navigate("/");
          }, 3000);
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            pauseOnHover: false,
          });
        } else {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            pauseOnHover: false,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
        });
        console.log(error.response.data.message);
      });
  };

  const { mutate } = useMutation(addUserData);

  // <--------- forgot password ----------->
  const afterForgot = useNavigate();

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    reset,
  } = useForm();
  const forgotDispatch = useDispatch();
  const forgotPassword = async (forgotData) => {
    await axios
      .post("http://127.0.0.1:8000/api/forgot-password", forgotData)
      .then((response) => {
        if (response?.data?.status == true) {
          handleClose();
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          let dataDispatch = forgotDispatch(forgotStatus(response));
          if (dataDispatch) {
            afterForgot("/reset-password");
          }
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          reset();
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const { mutate: mutateForgot } = useMutation(forgotPassword);
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit(mutate)}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button onClick={handleClickOpen}>Forgot password?</Button>
                </Grid>
                <Grid item>
                  <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Forgot Password</DialogTitle>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmitForgot(mutateForgot)}
        >
          <DialogContent>
            <DialogContentText>
              Don't Worry! Just fill your email and we will help you
              <br /> to reset your password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              {...registerForgot("email")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Send</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <ToastContainer />
    </>
  );
}

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { adminStatus } from "../redux/actions/productAction";
import { store } from "../redux/store";

export default function ResetPassword() {
  const { register, handleSubmit } = useForm();
  // <----------- password expiry ----------->
  const navigate = useNavigate();
  let newDate = new Date();
  let finalDate =
    newDate.getFullYear() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    newDate.getDate() +
    " " +
    (newDate.getHours() > 12 ? newDate.getHours() - 12 : newDate.getHours()) +
    ":" +
    newDate.getMinutes() +
    ":" +
    newDate.getSeconds();

  const getTime = store.getState();
  const getApiTime = getTime?.forgotPassword?.forgotInfo?.data?.time;

  var timestampDiff =
    new Date(finalDate).getTime() - new Date(getApiTime).getTime();

  if (Math.floor(timestampDiff / 1000 / 60) < 1) {
    setTimeout(() => {
      navigate("/login");
      console.log("inside else");
    }, 300000);
  } else {
    console.log("inside else");
  }

  // <----------- reset password ----------->
  const resetPassword = async (resetData) => {
    const getPassword = store.getState();
    const getApiPassword =
      getPassword?.forgotPassword?.forgotInfo?.data?.password;
    if (resetData.old_password == "") {
      toast.error("Old password required", {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: false,
      });
    }else if(resetData.password == ""){
      toast.error("New Password required", {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: false,
      });
    } else if (resetData.password_confirmation == "") {
      toast.error("Password Confirmation required", {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: false,
      });
    }else if (resetData.old_password === getApiPassword) {
      await axios
        .post("http://127.0.0.1:8000/api/reset-password", resetData)
        .then((res) => {
          if (res?.data?.status == true) {
            toast.success(res?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              pauseOnHover: false,
            });
            navigate("/login");
          } else {
            toast.error(res?.data?.message, {
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
        });
    } else {
      toast.error("password not matched", {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: false,
      });
    }
  };
  const { mutate } = useMutation(resetPassword);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
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
            id="old_password"
            label="Old Password"
            type="password"
            autoComplete="Old Password"
            autoFocus
            {...register("old_password")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="New Password"
            type="password"
            id="new_password"
            autoComplete="new-password"
            {...register("password")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirm_password"
            autoComplete="confirm-password"
            {...register("password_confirmation")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}

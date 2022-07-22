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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "../style.css";

export default function AdminLogin() {
  // open modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // admin login functionality
  const { register, handleSubmit } = useForm();
  const onLoginHandler = (data) => {
    axios
      .post("http://127.0.0.1:8000/api/admin-login", data)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
        });
        setTimeout(() => {
          dispatch(adminStatus(res.data));
          navigate("/admin");
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
        });
      });
  };

  const { mutate } = useMutation(onLoginHandler);

  // admin reset password functionality
  const {
    register: registerAdminForgot,
    handleSubmit: handleSubmitAdminForgot,
    reset
  } = useForm();
  const onResetPassword = async (adminReset) => {
    await axios
      .post("http://127.0.0.1:8000/api/admin-reset-password", adminReset)
      .then((res) => {
        if (res?.data?.status == true) {
          handleClose();
          reset();
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
      });
  };
  const { mutate: mutateAdminForgot } = useMutation(onResetPassword);

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
          Admin Sign in
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
            name="admin_email"
            autoComplete="email"
            autoFocus
            {...register("admin_email")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="admin_password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("admin_password")}
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
              <Button onClick={handleClickOpen} className="reset">
                Reset password?
              </Button>
            </Grid>
            <Grid item className="signup">
              <Link to="/admin-signup">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} className="reset-modal">
        <DialogTitle>Reset Password</DialogTitle>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmitAdminForgot(mutateAdminForgot)}
        >
          <DialogContent>
            <DialogContentText>
              Enter your email to receive a password allowing <br /> you to
              create a new password.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              {...registerAdminForgot("admin_email")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="New Password"
              type="password"
              fullWidth
              variant="standard"
              {...registerAdminForgot("admin_password")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
              {...registerAdminForgot("admin_password_confirmation")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Send</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <ToastContainer />
    </Container>
  );
}

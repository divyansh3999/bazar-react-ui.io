import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AdminSignup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const adminSignupData = (data) =>{
    axios.post('http://127.0.0.1:8000/api/admin-signup', data).then((res)=>{
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: false,
      });
      setTimeout(() => {
        navigate("/admin-login");
      }, 3000);
    }).catch((err)=>{
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: false,
      });
    })
  }
  const { mutate } = useMutation(adminSignupData);

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Sign up
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }} onSubmit={handleSubmit(mutate)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="admin_name"
                  required
                  fullWidth
                  id="admin_name"
                  label="Admin Name"
                  autoFocus
                  {...register('admin_name')}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="admin_email"
                  type="email"
                  label="Admin Email"
                  name="admin_email"
                  autoComplete="family-name"
                  {...register('admin_email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="admin_password"
                  type="password"
                  label="Admin Password"
                  name="admin_password"
                  autoComplete="email"
                  {...register('admin_password')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="admin_password_confirmation"
                  label="Confirm Password"
                  type="password"
                  id="admin_password_confirmation"
                  autoComplete="new-password"
                  {...register('admin_password_confirmation')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item className="signup">
                <Link to="/admin-login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer/>
      </Container>
  );
}
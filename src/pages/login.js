import React, {useEffect, useState} from 'react';
import { UserAuth } from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SocialIcon} from "react-social-icons";
const Login = () => {
  const { googleSignIn, facebookSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = UserAuth();
  const notify = () => toast("Something went wrong!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      //to redirect on MFA page
      navigate('/askQuestion')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
      toast(e.message);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      // to call google login from auth context
      await googleSignIn();
    } catch (error) {
      console.log(error);
      notify();
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      // to call facebook login from auth context
      await facebookSignIn();
    } catch (error) {
      console.log(error);
      notify();
    }
  };

  function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="#">
            Trivia Titans
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
    );
  }

  const defaultTheme = createTheme();

  return (
      <div>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="center" >
                  <SocialIcon style={{marginRight: "5px"}} network="google" onClick={handleGoogleSignIn}/>
                  <SocialIcon  network="facebook" onClick={handleFacebookSignIn}/>
                </Grid>
                <Grid container justifyContent="center" sx={{ mt: 3, mb: 2 }}>
                  <Grid item>
                    <Link to="/" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                    <br/>
                    <Link to="/reset-password" style={{marginLeft: "50px"}} variant="body2">
                      {"Forget Password?"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 2, mb: 4 }} />
          </Container>
          <ToastContainer />
        </ThemeProvider>
      </div>
  );
};

export default Login;
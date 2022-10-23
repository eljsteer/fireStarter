import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import {validateEmail } from "../utils/helpers";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from "../utils/auth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#0c1012',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '', showPassword: false});
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState(false);
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if( name === "password") {
      if(!value) {
        setPasswordError(true);
        setPasswordHelperText("A Valid Password is required");
      } else if (value) {
        setPasswordError(false);
        setPasswordHelperText(false);
      }
    } 
    setUserFormData({ 
      ...userFormData, 
      [name]: value 
    });
  };

  const handleClickShowPassword = () => {
    setUserFormData({
      ...userFormData,
      showPassword: !userFormData.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const isValid = validateEmail(event.target.value);
    if (name === "email") {
      if(!isValid) {
        setEmailError(true);
        setEmailHelperText("A Valid Email is required");
      } else if (isValid) {
        setEmailError(false);
        setEmailHelperText(false);
      }
    } else if( name === "password") {
      if(!value) {
        setPasswordError(true);
        setPasswordHelperText("A Valid Password is required");
      } else if (value) {
        setPasswordError(false);
        setPasswordHelperText(false);
      }
    } 
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({ 
        variables: { ...userFormData } 
      });
      Auth.login(data.login.token);

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    navigate("/profile");

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <Container sx={{height: '100vh'}} maxWidth="sm" alignItems="center">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          flexGrow: 1
        }}
        noValidate
        onSubmit={handleFormSubmit}
        autoComplete="off"
      > 
        <Grid container columns={12}>
          <Grid display="flex" justifyContent="center" >
            <Card sx={{ maxWidth: 700, backgroundColor: '#0c1012' }}>
              <CardMedia
                component="img"
                alt="sparks_login_background"
                image={process.env.PUBLIC_URL + '/assets/images/LoginCardBkg-unsplash.jpg'}
                />
              <CardContent sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-error-helper-text"
                    // label="Email"
                    type="email"
                    name="email"
                    placeholder="Please enter your email"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={userFormData.email}
                    error={emailError}
                    helperText={emailHelperText}
                    required
                  />
                  <br/>
                <InputLabel htmlFor="outlined-adornment-amount">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-error-helper-text"
                    type={userFormData.showPassword ? "text" : "password"}
                    name="password"
                    // label="Password"
                    placeholder="Please enter a Password"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={userFormData.password}
                    error={passwordError}
                    helperText={passwordHelperText}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                        {userFormData.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
              </CardContent>
              {showAlert && 
              <Alert severity="error" onClose={() => {setShowAlert(false)}}>
                Computer says no! It doesn't like your incorrect login details!
              </Alert>}
              
              <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                  <Item>
                    <Button
                    disabled={!(userFormData.email && userFormData.password)}
                    type='submit'
                    variant='contained'
                    sx={{ width: '50%' }}
                    onSubmit={handleFormSubmit}
                    >
                      Log In
                    </Button>
                  </Item>
                  <Item>OR</Item>
                  <Item>
                    <Typography>Don't Have an Account? 
                      <br />
                      <br />
                      <Link to="/signup"> Sign Up</Link>
                    </Typography>
                  </Item>
                </Stack>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginForm;

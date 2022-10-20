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
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {validateEmail } from "../utils/helpers";
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from "../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [helperText, setHelperText] = useState(false);
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if( name === "password") {
      if(!value) {
        setPasswordError(true);
        setHelperText("A Valid Password is required");
      } else if (value) {
        setPasswordError(false);
        setHelperText(false);
      }
    } 
    setUserFormData({ 
      ...userFormData, 
      [name]: value 
    });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const isValid = validateEmail(event.target.value);
    if (name === "email") {
      if(!isValid) {
        setEmailError(true);
        setHelperText("A Valid Email is required");
      } else if (isValid) {
        setEmailError(false);
        setHelperText(false);
      }
    } else if( name === "password") {
      if(!value) {
        setPasswordError(true);
        setHelperText("A Valid Password is required");
      } else if (value) {
        setPasswordError(false);
        setHelperText(false);
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
      Auth.loginUser(data.login.token);

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Container maxWidth="sm" alignItems="center">
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
              <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                  component="img"
                  alt="sparks_login_background"
                  image={process.env.PUBLIC_URL + '/assets/images/LoginCardBkg-unsplash.jpg'}
                  />
                <CardContent>
                  <TextField
                    id="outlined-error-helper-text"
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Please enter your email"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={userFormData.email}
                    error={emailError}
                    helperText={helperText}
                    required
                  />
                  <TextField
                    id="outlined-error-helper-text"
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Please enter a Password"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={userFormData.password}
                    error={passwordError}
                    helperText={helperText}
                    required
                  />
                </CardContent>
                {showAlert && 
                <Alert severity="error" onClose={() => {setShowAlert(false)}}>
                  Computer says No! It doesn't like your Incorrect login details!
                </Alert>}
                <div>
                  <Button
                    disabled={!(userFormData.email && userFormData.password)}
                    type='submit'
                    variant='outlined'
                    sx={{ width: '25ch' }}
                    onSubmit={handleFormSubmit}
                    >
                    Log In
                  </Button>
                </div>
                <Stack direction="row">
                  <hr></hr>
                  <div>OR</div>
                  <hr></hr>
                </Stack>
                <br/>
                <Typography>Don't Have an Account? 
                  <Link to="/signup"> Sign Up</Link>
                </Typography>
                <br />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default LoginForm;

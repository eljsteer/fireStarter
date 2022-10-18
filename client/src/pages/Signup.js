import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import {validateEmail } from "../utils/helpers";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ firstName:"", lastName:"", email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [helperText, setHelperText] = useState(false);
  const [createUser, { error, data }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const isValid = validateEmail(event.target.value);
    if (name === "firstName") {
      if(!value) {
        setInputError(true);
        setHelperText("Please enter your First Name");
      } else if (value) {
        setInputError(false);
        setHelperText(false);
      }
    } else if (name === "lastName") {
      if(!value) {
        setInputError(true);
        setHelperText("Please enter your Last Name");
      } else if (value) {
        setInputError(false);
        setHelperText(false);
      }
    } else if (name === "email") {
      if(!isValid) {
        setEmailError(true);
        setHelperText("A valid Email is required");
      } else if (isValid) {
        setEmailError(false);
        setHelperText(false);
      }
    } else if( name === "password") {
      if(!value) {
        setInputError(true);
        setHelperText("A valid Password is required");
      } else if (value) {
        setInputError(false);
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
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      Auth.login(data.createUser.token);

    } catch (e) {
      console.error(e);
    }
    navigate("/adduserinfo");

    setUserFormData({
      firstName: '',
      lastName: '',
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
            "& .MuiTextField-root": { m: 1, width: "25ch" },
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
                  image={process.env.PUBLIC_URL + "/assets/images/LoginCardBkg-unsplash.jpg"}
                  />
                <CardContent>
                  <TextField
                    id="outlined-error-helper-text"
                    label="First Name"
                    type="text"
                    name="firstName"
                    placeholder="Please enter First Name"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={userFormData.firstName}
                    error={emailError}
                    helperText={helperText}
                    required
                  />
                  <TextField
                    id="outlined-error-helper-text"
                    label="Last Name"
                    type="text"
                    name="lastName"
                    placeholder="Please enter Last Name"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={userFormData.lastName}
                    error={inputError}
                    helperText={helperText}
                    required
                  />
                  <TextField
                    id="outlined-error-helper-text"
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Please enter your email"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={userFormData.email}
                    error={inputError}
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
                    error={inputError}
                    helperText={helperText}
                    required
                  />
                </CardContent>
                {showAlert && 
                <Alert severity="error" onClose={() => {setShowAlert(false)}}>
                  Computer says No! It doesn"t like your Incorrect login details!
                </Alert>}
                <Button
                  disabled={!(userFormData.firstName && userFormData.lastName && userFormData.email && userFormData.password)}
                  type="submit"
                  variant="outlined"
                  sx={{ width: "25ch" }}
                  onSubmit={handleFormSubmit}
                  >
                  Sign Up
                </Button>
                <Stack direction="row">
                  <hr></hr>
                  <div>OR</div>
                  <hr></hr>
                </Stack>
                <br/>
                <Typography>Already have an Account? 
                <Link to="/login"> Log In</Link>
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

export default SignupForm;

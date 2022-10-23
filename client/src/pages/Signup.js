import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
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

  const [firstInputError, setFirstInputError] = useState(false);
  const [lastInputError, setLastInputError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passInputError, setPassInputError] = useState(false);

  const [firstHelperText, setFirstHelperText] = useState(false);
  const [lastHelperText, setLastHelperText] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState(false);
  const [passHelperText, setPassHelperText] = useState(false);

  const [createUser ] = useMutation(CREATE_USER);
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
        setFirstInputError(true);
        setFirstHelperText("Please enter your First Name");
      } else if (value) {
        setFirstInputError(false);
        setFirstHelperText(false);
      }
    } else if (name === "lastName") {
      if(!value) {
        setLastInputError(true);
        setLastHelperText("Please enter your Last Name");
      } else if (value) {
        setLastInputError(false);
        setLastHelperText(false);
      }
    } else if (name === "email") {
      if(!isValid) {
        setEmailError(true);
        setEmailHelperText("A valid Email is required");
      } else if (isValid) {
        setEmailError(false);
        setEmailHelperText(false);
      }
    } else if( name === "password") {
      if(!value) {
        setPassInputError(true);
        setPassHelperText("A valid Password is required");
      } else if (value) {
        setPassInputError(false);
        setPassHelperText(false);
      }
    } 
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
                    error={firstInputError}
                    helperText={firstHelperText}
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
                    error={lastInputError}
                    helperText={lastHelperText}
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
                    error={emailError}
                    helperText={emailHelperText}
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
                    error={passInputError}
                    helperText={passHelperText}
                    required
                  />
                </CardContent>
                <Button
                  disabled={!(userFormData.firstName && userFormData.lastName && userFormData.email && userFormData.password) || emailError === true}
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

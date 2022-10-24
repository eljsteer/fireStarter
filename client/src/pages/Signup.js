import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import {validateEmail } from "../utils/helpers";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#0c1012',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

      Auth.signup(data.createUser.token);

    } catch (e) {
      console.error(e);
    }
    // navigate("/adduserinfo");

    setUserFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <Container sx={{height: '100vh'}} maxWidth="sm" alignItems="center">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "auto" },
          flexGrow: 1
        }}
        noValidate
        onSubmit={handleFormSubmit}
        autoComplete="off"
      > 
        <Card sx={{ backgroundColor: '#0c1012' }}>
          <CardContent>
            <TextField
              id="outlined-error-helper-text"
              sx={{display: 'flex', justifyContent:"center"}}
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
              sx={{display: 'flex', justifyContent:"center"}}
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
              sx={{display: 'flex', justifyContent:"center"}}
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
              sx={{display: 'flex', justifyContent:"center"}}
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
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <Item>
                <Button
                  disabled={!(userFormData.firstName && userFormData.lastName && userFormData.email && userFormData.password) || emailError === true}
                  type="submit"
                  variant="contained"
                  sx={{ width: '50%' }}
                  onSubmit={handleFormSubmit}
                  >
                  Sign Up
                </Button>
              </Item>
              <Item>OR</Item>
              <Item>
                <Typography>Already have an Account? 
                  <br />
                  <br />
                  <Link to="/login"> Log In</Link>
                </Typography>
              </Item>
            </Stack>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default SignupForm;

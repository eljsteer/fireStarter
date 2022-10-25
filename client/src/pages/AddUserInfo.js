import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import {
  Alert,
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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SaveIcon from '@mui/icons-material/Save';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import {validateURL } from "../utils/helpers";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";

// >>---------------------------------->>
// Add and Update User Info Page
// >>---------------------------------->>

// Page Material UI Theme
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#0c1012',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Page Logic and React hooks
const AddUserInfo = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [gitHubError, setGitHubError] = useState(false);
  const [linkedinError, setLinkedinError] = useState(false);
  const [submitButton, setSubmitButton] = useState(true);
  const [helperText, setHelperText] = useState(false);
  const navigate = useNavigate();

  const [updateUser, { error, data }] = useMutation(UPDATE_USER);
  const [userFormData, setUserFormData] = useState({ github:"", linkedin:"", skills: "" });

  const handleInputChange = (event) => {
    const { name, value, error } = event.target;
    setUserFormData({ ...userFormData, [name]: value });

    if (name ==="github" || name === "linkedin" || name === "skills") {
      if (error === true) {
        setSubmitButton(false);
      } else if (error === false) {
        if (value) {
          setSubmitButton(true);
        } else {
          setSubmitButton(false);
        }
      };
    };
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const isValid = validateURL(event.target.value);
    if (name === "github") {
      if(value && !isValid) {
        setGitHubError(true);
        setHelperText("Please enter a valid github URL");
      }
    } else if (name === "linkedin") {
      if(value && !isValid) {
        setLinkedinError(true);
        setHelperText("Please enter a valid linkedin URL");
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const updateUserData = {
      github: userFormData.github,
      linkedin: userFormData.linkedin,
      skills: userFormData.skills.split(",")
    }

    console.log({userFormData});

    try {
      const { data } = await updateUser({
        variables: { updateData: updateUserData },
      });

    } catch (e) {
      console.error(e);
    };

    if(submitButton === true) {
      navigate("/profile")
    } else if (submitButton === false) {
      setShowAlert(true);
    };
  };

 // JSX Page Returned
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
        <Card sx={{backgroundColor: '#0c1012' }}>
          <CardContent>
            <Typography sx={{textAlign: 'center'}} variant="h6">Please provide some more information</Typography>
            <br/>
            <TextField
              id="outlined-error-helper-text"
              sx={{display: 'flex', justifyContent:"center"}}
              label="Github URL"
              type="text"
              name="github"
              placeholder="Please your Github URL"
              onChange={handleInputChange}
              onBlur={handleBlur}
              value={userFormData.github}
              error={gitHubError}
              helperText={helperText}
              required
              fullWidth 
            />
            <TextField
              id="outlined-error-helper-text"
              sx={{display: 'flex', justifyContent:"center"}}
              label="Linkedin URL"
              type="text"
              name="linkedin"
              placeholder="Please enter your linkedin URL"
              onChange={handleInputChange}
              onBlur={handleBlur}
              value={userFormData.linkedin}
              error={linkedinError}
              helperText={helperText}
              required
              fullWidth 
            />
            <TextField
              id="outlined-error-helper-text"
              sx={{display: 'flex', justifyContent:"center"}}
              label="Skills"
              type="skills"
              name="skills"
              placeholder="Please enter your skills"
              onChange={handleInputChange}
              onBlur={handleBlur}
              value={userFormData.skills}
              required
              fullWidth 
            />
          </CardContent>
            {showAlert && 
            <Alert severity="error" onClose={() => {setShowAlert(false)}}>
              <span>Computer says no!</span> 
              <span>Please enter details in at least one field</span>
            </Alert>}

            <Box sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <Item>
                  <Button
                    type="submit"
                    name="completeButton"
                    variant="outlined"
                    sx={{ width: '45%' }}
                    onSubmit={handleFormSubmit}
                    >
                    <SaveIcon />
                    Save
                  </Button>
                </Item>
                <Item>
                  <Button
                    type="submit"
                    name="skipButton"
                    variant="outlined"
                    sx={{ width: '45%' }}
                    onClick={() => navigate("/")}
                    >
                    Skip
                    <ChevronRightIcon />
                  </Button>
                </Item>
                <Item>
                  <Link to='/profile'>
                      <Button variant="contained">
                          <ChevronLeftIcon /> Go Back
                      </Button>
                  </Link>
                </Item>
              </Stack>
            </Box>                 
          <br/>
        </Card>        
      </Box>
    </Container>
  );
};

export default AddUserInfo;

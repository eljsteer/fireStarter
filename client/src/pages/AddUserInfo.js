import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {validateURL } from "../utils/helpers";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";

const AddUserInfo = () => {
  const [userFormData, setUserFormData] = useState({ github:"", linkedin:"", skills: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [gitHubError, setGitHubError] = useState(false);
  const [linkedinError, setLinkedinError] = useState(false);
  const [submitButton, setSubmitButton] = useState(true);
  const [helperText, setHelperText] = useState(false);
  const [updateUser, { error, data }] = useMutation(UPDATE_USER);
  const navigate = useNavigate();

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
      console.log(gitHubError)
    } else if (name === "linkedin") {
      if(value && !isValid) {
        setLinkedinError(true);
        setHelperText("Please enter a valid linkedin URL");
      }
      console.log(linkedinError);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await updateUser({
        variables: { ...userFormData,  },
      });

    } catch (e) {
      console.error(e);
    };

    if(submitButton === true) {
      navigate("/profile")
    } else if (submitButton === false) {
      setShowAlert(true);
    };

    setUserFormData({
      github: '',
      linkedin: '',
      skills: '',
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
                <Typography>Please provide some more details...</Typography>
                  <TextField
                    id="outlined-error-helper-text"
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
                  />
                  <TextField
                    id="outlined-error-helper-text"
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
                  />
                  <TextField
                    id="outlined-error-helper-text"
                    label="Skills"
                    type="skills"
                    name="skills"
                    placeholder="Please enter your skills"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={userFormData.skills}
                    required
                  />
                </CardContent>
                  {showAlert && 
                  <Alert severity="error" onClose={() => {setShowAlert(false)}}>
                    <span>Computer says no!!</span> 
                    <span>Please enter details in at least one field</span>
                  </Alert>}
                  <Button
                    type="submit"
                    name="completeButton"
                    variant="outlined"
                    sx={{ width: "20ch", margin:"10px" }}
                    onSubmit={handleFormSubmit}
                    >
                    Complete
                  </Button>
                  <Button
                    type="submit"
                    name="skipButton"
                    variant="outlined"
                    sx={{ width: "20ch", margin:"10px" }}
                    onClick={() => navigate("/")}
                    >
                    Skip
                    <ChevronRightIcon />
                  </Button>
                <br/>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default AddUserInfo;

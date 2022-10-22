import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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
  const [gitHubError, setGitHubError] = useState(false);
  const [linkedinError, setLinkedinError] = useState(false);
  const [submitButton, setSubmitButton] = useState(false);
  const [helperText, setHelperText] = useState(false);
  const [updateUser, { error, data }] = useMutation(UPDATE_USER);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
        if (gitHubError === true || linkedinError === true) {
      setSubmitButton(true);
    } else if (gitHubError === false && linkedinError === false) {
      setSubmitButton(false);
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const isValid = validateURL(event.target.value);
    if (name === "github") {
      if(!isValid) {
        setGitHubError(true);
        setHelperText("Please enter a valid github URL");
      } else if (value) {
        setGitHubError(false);
        setHelperText(false);
      }
      console.log(gitHubError)
    } else if (name === "linkedin") {
      if(!isValid) {
        setLinkedinError(true);
        setHelperText("Please enter a valid linkedin URL");
      } else if (value) {
        setLinkedinError(false);
        setHelperText(false);
      }
      console.log(linkedinError);
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
      const { data } = await updateUser({
        variables: { ...userFormData,  },
      });
      return data;

    } catch (e) {
      console.error(e);
    }
    navigate("/");

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
                  <Button
                    disabled={submitButton}
                    type="submit"
                    variant="outlined"
                    sx={{ width: "20ch", margin:"10px" }}
                    onSubmit={handleFormSubmit}
                    >
                    Complete
                  </Button>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ width: "20ch", margin:"10px" }}
                    onSubmit={e => navigate("/")}
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

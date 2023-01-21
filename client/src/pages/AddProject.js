import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { experimentalStyled as styled } from "@mui/material/styles";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Box";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";

import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../utils/mutations";
import { QUERY_ME, QUERY_PROJECTS } from "../utils/queries";
import {validateURL } from "../utils/helpers";

// >>------------------------>>
// Add Project Page
// >>------------------------>>

// Page Material UI Theme
let theme = createTheme();
theme = responsiveFontSizes(theme);

theme.typography.h3 = {
    fontSize: "2rem",
    "@media (min-width:600px)": {
        fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "2rem",
    },
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "var(--ComponentGBColor)",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: 25
}));

export default function AddProject() {
    
    const [projectFormData, setProjectFormData] = useState(
        { 
            title: "", 
            description: "", 
            gitRepo: "", 
            fundingGoal: "", 
            currentFunds: ""  
        }
    );
    const [ showAlert, setShowAlert ] = useState(false);
    const [ titleError, setTitleError] = useState(false);
    const [ titleHelperText, setTitleHelperText ] = useState(false);
    const [ descriptionError, setDescriptionError ] = useState(false);
    const [ descriptionHelperText, setDescriptionHelperText ] = useState(false);
    const [ gitHubError, setGitHubError ] = useState(false);
    const [ gitHubHelperText, setGitHubHelperText ] = useState(false);
    const [ fundingGoalError, setFundingGoalError ] = useState(false);
    const [ fundingGoalHelperText, setFundingGoalHelperText ] = useState(false);
    const [ currentFundsError, setCurrentFundsError ] = useState(false);
    const [ currentFundsHelperText, setcurrentFundsHelperText ] = useState(false);
    // const [ addProjectButton, setAddProjectButton ] = useState(true);
    const [ addProject ] = useMutation(ADD_PROJECT, {
        refetchQueries: [
            {query: QUERY_ME},
            {query: QUERY_PROJECTS}
        ]
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const isValidURL = validateURL(event.target.value);
        if( name === "title") {
            if(!value) {
                setTitleError(true);
                setTitleHelperText("You must add a title for your project");
            } else if (value) {
                setTitleError(false);
                setTitleHelperText(false);
            }            
        } else if( name === "description") {
            if(!value) {
                setDescriptionError(true);
                setDescriptionHelperText("You must add a description for your project");
            } else if (value) {
                setDescriptionError(false);
                setDescriptionHelperText(false);
            }            
        } else if( name === "gitRepo") {
            if(!value) {
              setGitHubError(true);
              setGitHubHelperText("You must add a Github URL for your project");
            } else if (value && !isValidURL) {
                setGitHubError(true);
                setGitHubHelperText("Please enter a valid URL");            
            } else if (value && isValidURL) {
                setGitHubError(false);
                setGitHubHelperText(false);
            } 
        }  else if( name === "fundingGoal") {
            if(!value) {
              setFundingGoalError(true);
              setFundingGoalHelperText("Funding Goal is required");          
            } else if(isNaN(value)) {
              setFundingGoalError(true);
              setFundingGoalHelperText("Please enter numbers Only");          
            } else {
              setFundingGoalError(false);
              setFundingGoalHelperText(false);
            }   
        } else if( name === "currentFunds") {
              if(isNaN(value)) {
                setCurrentFundsError(true);
                setcurrentFundsHelperText("Please enter numbers Only");      
              } else {
                setCurrentFundsError(false);
                setFundingGoalHelperText(false);
              }
          }
        setProjectFormData({
            ...projectFormData,
            [name]: value
        });
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        const isValid = validateURL(event.target.value);
        if ( name === "title") {
            if(!value) {
                setTitleError(true);
                setTitleHelperText("You must add a title for your project");
            } else if (value) {
                setTitleError(false);
                setTitleHelperText(false);
            }            
        } else if ( name === "description") {
            if(!value) {
                setDescriptionError(true);
                setDescriptionHelperText("You must add a description for your project");
            } else if (value.length < 5 || value.length > 300) {
                setDescriptionError(true);
                setDescriptionHelperText("Description must be at least 5 characters and less than 300 characters");
            } else {
              setDescriptionError(false);
              setDescriptionHelperText(false);
            }
        } else if( name === "gitRepo") {
            if(!value) {
                setGitHubError(true);
                setGitHubHelperText("You must add a Github URL for your project");
              } else if (value && !isValid) {
                  setGitHubError(true);
                  setGitHubHelperText("Please add a valid URL");            
              } else if (value && isValid) {
                  setGitHubError(false);
                  setGitHubHelperText(false);
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
            const { data } = await addProject({
                variables: { ...projectFormData }
            })
            console.log(data);
        } catch (error) {
            console.error(error);
            setShowAlert(true);
        }

        setProjectFormData(
            {
                title: "", 
                description: "", 
                gitRepo: "", 
                fundingGoal: "", 
                currentFunds: "" 
            }
        )
        
        navigate("/profile");
    }

  // JSX Page Returned
    return (
        <Container sx={{height: "100vh"}}>
            <Item>  
                <ThemeProvider theme={theme}>
                    <Typography variant="h3">Add Project</Typography>
                </ThemeProvider>
            </Item>

            <Card sx={{ backgroundColor: "var(--ComponentGBColor)", display: "flex", justifyContent:"center", alignItems:"top", flexDirection: "column" }}>
                <CardContent>
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "auto"},
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleFormSubmit}
                        >
                        <div>
                            <TextField
                            id="outlined-textarea"
                            sx={{display: "flex", justifyContent:"center"}}
                            label="Title"
                            type="title"
                            name="title"
                            placeholder="Enter project title"
                            multiline
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            value={projectFormData.title}
                            error={titleError}
                            helperText={titleHelperText}
                            required
                            />
                            <TextField
                            id="outlined-textarea"
                            sx={{display: "flex", justifyContent:"center"}}
                            label="Description"
                            type="description"
                            name="description"
                            placeholder="Enter project description"
                            multiline
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            value={projectFormData.description}
                            error={descriptionError}
                            helperText={descriptionHelperText}
                            required
                            />
                            <TextField
                            id="outlined-textarea"
                            sx={{display: "flex", justifyContent:"center"}}
                            label="Github Repository"
                            type="gitRepo"
                            name="gitRepo"
                            placeholder="Enter GitHub repository Link"
                            multiline
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            value={projectFormData.gitRepo}
                            error={gitHubError}
                            helperText={gitHubHelperText}
                            />
                            <TextField
                            id="outlined-textarea"
                            sx={{display: "flex", justifyContent:"center"}}
                            label="Funding Goal"
                            type="fundingGoal"
                            name="fundingGoal"
                            placeholder="Enter funding goal"
                            multiline
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            value={projectFormData.fundingGoal}
                            error={fundingGoalError}
                            helperText={fundingGoalHelperText}
                            />
                            <TextField
                            id="outlined-textarea"
                            sx={{display: "flex", justifyContent:"center"}}
                            label="Current Funding"
                            type="currentFunds"
                            name="currentFunds"
                            placeholder="Enter current funding"
                            multiline
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            value={projectFormData.currentFunds}
                            error={currentFundsError}
                            helperText={currentFundsHelperText}
                            />
                        </div>                       
                    </Box>
                </CardContent>
                {showAlert && 
                    <Alert severity="error" onClose={() => {setShowAlert(false)}}>
                        All required fields must be completed
                    </Alert>
                }
                <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                margin={2}
                >
                    <Button 
                        variant="contained" 
                        color="success"
                        disabled={!(projectFormData.title && projectFormData.description && projectFormData.gitRepo) || (gitHubError || fundingGoalError || currentFundsError === true)}
                        type="submit"
                        onClick={handleFormSubmit}
                        >
                        <AddIcon /> Add
                    </Button>
                    <Link to="/profile">
                        <Button variant="contained">
                            <ChevronLeftIcon /> Go Back
                        </Button>
                    </Link>                
                </Stack>                
            </Card>
        </Container>
    )
}
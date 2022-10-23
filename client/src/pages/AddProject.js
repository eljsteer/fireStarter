import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Box';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';

import Auth from "../utils/auth";
import { saveProjectIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../utils/mutations';


let theme = createTheme();
theme = responsiveFontSizes(theme);

theme.typography.h3 = {
    fontSize: '2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#0c1012',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 25
}));

export default function AddProject() {
    const [value, setValue] = React.useState('Controlled');
    const [projectFormData, setProjectFormData] = useState(
        { 
            title: '', 
            description: '', 
            gitRepo: '', 
            fundingGoal: '', 
            currentFunds: ''  
        }
    );
    const [showAlert, setShowAlert] = useState(false);
    const [ titleError, setTitleError] = useState(false);
    const [ titleHelperText, setTitleHelperText ] = useState(false);
    const [ descriptionError, setDescriptionError] = useState(false);
    const [ descriptionHelperText, setDescriptionHelperText ] = useState(false);
    const [ addProject, { error, data }] = useMutation(ADD_PROJECT);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if( name === 'title') {
            if(!value) {
                setTitleError(true);
                setTitleHelperText('You must add a title for your project');
            } else if (value) {
                setTitleError(false);
                setTitleHelperText(false);
            }            
        }

        if( name === 'description') {
            if(!value) {
                setDescriptionError(true);
                setDescriptionHelperText('You must add a description for your project');
            } else if (value) {
                setDescriptionError(false);
                setDescriptionHelperText(false);
            }            
        }
        setProjectFormData({
            ...projectFormData,
            [name]: value
        });
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        if ( name === 'title') {
            if(!value) {
                setTitleError(true);
                setTitleHelperText('You must add a title for your project');
            } else if (value) {
                setTitleError(false);
                setTitleHelperText(false);
            }            
        } else if ( name === 'description') {
            if(!value) {
                setDescriptionError(true);
                setDescriptionHelperText('You must add a description for your project');
            } else if (value) {
                setDescriptionError(false);
                setDescriptionHelperText(false);
            }
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        }
        try {
            const { data } = await addProject({
                variables: { ...projectFormData }
            })
            console.log(data);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setProjectFormData(
            {
                title: '', 
                description: '', 
                gitRepo: '', 
                fundingGoal: '', 
                currentFunds: '' 
            }
        )
    }

    return (
        <Container sx={{height: '100vh'}}>
            <Item>  
                <ThemeProvider theme={theme}>
                    <Typography variant="h3">Add Project</Typography>
                </ThemeProvider>
            </Item>

            <Card sx={{ backgroundColor: '#0c1012', display: 'flex', justifyContent:"center", alignItems:"top", flexDirection: 'column' }}>
                <CardContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: 'auto'},
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleFormSubmit}
                        >
                        <div>
                            <TextField
                            id="outlined-textarea"
                            sx={{display: 'flex', justifyContent:"center"}}
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
                            sx={{display: 'flex', justifyContent:"center"}}
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
                            sx={{display: 'flex', justifyContent:"center"}}
                            label="Github Repository"
                            type="gitRepo"
                            name="gitRepo"
                            placeholder="Enter repository name"
                            multiline
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            value={projectFormData.gitRepo}
                            />
                            <TextField
                            id="outlined-textarea"
                            sx={{display: 'flex', justifyContent:"center"}}
                            label="Funding Goal"
                            type="fundingGoal"
                            name="fundingGoal"
                            placeholder="Enter funding goal"
                            multiline
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            value={projectFormData.fundingGoal}
                            />
                            <TextField
                            id="outlined-textarea"
                            sx={{display: 'flex', justifyContent:"center"}}
                            label="Current Funding"
                            type="currentFunds"
                            name="currentFunds"
                            placeholder="Enter current funding"
                            multiline
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            value={projectFormData.currentFunds}
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
                    <Link to='/profile'>
                        <Button 
                            variant="contained" 
                            color="success"
                            disabled={!(projectFormData.title && projectFormData.description)}
                            type="submit"
                            onClick={handleFormSubmit}
                            >
                            <AddIcon /> Add
                        </Button>
                    </Link>
                    <Link to='/profile'>
                        <Button variant="contained">
                            <ChevronLeftIcon /> Go Back
                        </Button>
                    </Link>                
                </Stack>                
            </Card>
        </Container>
    )
}
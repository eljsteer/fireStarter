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
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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
    const [ descriptionError, setDescriptionError] = useState(false);
    const [ titleHelperText, setTitleHelperText ] = useState(false);
    const [ addProject, { error, data }] = useMutation(ADD_PROJECT);


    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', maxWidth: 900, justifyContent: 'center'}}>
            <Item>  
                <ThemeProvider theme={theme}>
                    <Typography variant="h3">Add Project</Typography>
                </ThemeProvider>
            </Item>

            <Card sx={{ minWidth: 275 }}>
                <CardContent sx={{maxWidth: 1200}}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '30ch'},
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <div>
                            <TextField
                            id="outlined-textarea"
                            label="Title"
                            placeholder="Enter project title"
                            multiline
                            />
                            <TextField
                            id="outlined-textarea"
                            label="Description"
                            placeholder="Enter project description"
                            multiline
                            />
                            <TextField
                            id="outlined-textarea"
                            label="Github Repository"
                            placeholder="Enter repository name"
                            multiline
                            />
                            <TextField
                            id="outlined-textarea"
                            label="Funding Goal"
                            placeholder="Enter funding goal"
                            multiline
                            />
                            <TextField
                            id="outlined-textarea"
                            label="Current Funding"
                            placeholder="Enter current funding"
                            multiline
                            />
                        </div>                       
                    </Box>
                </CardContent>
                <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                margin={2}
                >
                    <Button variant="contained" color="success">
                        <AddIcon /> Add
                    </Button>
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
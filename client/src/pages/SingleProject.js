import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { createTheme, responsiveFontSizes, ThemeProvider, } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';

import Auth from "../utils/auth";
import { removeProjectId } from '../utils/localStorage';

import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { REMOVE_PROJECT } from '../utils/mutations';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function SingleProject() {
    const { id } = useParams();

    const {loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId: id },
    });

    const singleProject = data?.singleProject || {};
    console.log(singleProject);
    
    const [removeProject] = useMutation(REMOVE_PROJECT);

    const handleProjectDelete = async (projectId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null; // checks if the user is logged in 

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeProject({
                variables: { projectId }
            });

            removeProjectId(projectId); // remove project from local storage
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return <div>Fire is starting...</div>;
    }

    return (
        <>
            <Card sx={{ maxWidth: 1250 }}>
                <CardContent>
                    <ThemeProvider theme={theme}>
                        <Typography gutterBottom variant="h4" component="div">
                            {singleProject.title} <br />                        
                        </Typography>
                        <Typography gutterBottom variant="p" component="div">
                            <p><span><CalendarMonthOutlinedIcon /></span> Project created: {singleProject.createdAt}</p>
                        </Typography>
                        <Typography variant="body1">
                            {singleProject.description} <br />
                        </Typography>
                    </ThemeProvider>
                </CardContent>
                <CardActions>
                <a
                    underline='none'
                    // href={'https://github.com/`${singleProject.gitRepo}`'}
                >
                    <Button 
                    variant="outlined"
                    underline='none'
                        >
                            GitHub Repo
                        </Button>
                    </a>
                </CardActions>
                <CardContent>
                    <ThemeProvider theme={theme}>
                        <Typography gutterBottom variant="body1" component="div">
                            Funding Goal: ${singleProject.fundingGoal} <br />
                        </Typography>
                        <br />
                        <Typography variant="body1">
                            Current Funding: ${singleProject.currentFunds} <br />
                        </Typography>
                    </ThemeProvider>
                </CardContent>
            </Card>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                margin={2}
            >
                <Button variant="contained" color="success">
                    <AttachMoneyOutlinedIcon /> Fund this project
                </Button>
                <Button 
                    variant="outlined" 
                    color="error"
                    onClick={() => handleProjectDelete(singleProject.projectId)}>
                    <DeleteIcon /> Delete this project
                </Button>
                <Link to='/profile'>
                    <Button variant="contained">
                        <ChevronLeftIcon/> Go Back
                    </Button>
                </Link>                
            </Stack>
        </>
    )
};

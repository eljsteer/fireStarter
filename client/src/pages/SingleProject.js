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
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
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
                <Link to='/discover'>
                    <Button variant="outlined">
                        <ChevronLeftIcon/> Go Back
                    </Button>
                </Link>                
            </Stack>
        </>
    )
}

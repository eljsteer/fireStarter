import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from "@mui/material/Chip"
import { createTheme, responsiveFontSizes, ThemeProvider, } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';

import Auth from "../utils/auth";
import { removeProjectId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { REMOVE_PROJECT, UPDATE_PROJECT } from '../utils/mutations';
import { QUERY_SINGLE_PROJECT, QUERY_ME } from '../utils/queries';
import { stringifyForDisplay } from '@apollo/client/utilities';

// >>------------------>>
// Signup Page Code
// >>------------------>>

// Page Theme Material UI
let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function SingleProject() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { loading, data, error } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId: id },
    });
    
    let [userVoted, setUserVoted] = useState(false);
    const singleProject = data?.singleProject || {};
    let [addVote, setAddVote] = useState(0);
    let votesInteger = parseInt(singleProject.votes);
    let NumVotes = votesInteger+addVote;

    // const [updateProject, { error }] = useMutation(UPDATE_PROJECT, {
    //   variables: { votes: NumVotes}
    // });
    //const [updateProject, { voteData, error }] = useMutation(UPDATE_PROJECT);

    const [removeProject] = useMutation(REMOVE_PROJECT, {
        refetchQueries: [
            {query: QUERY_ME}
        ]
    });

    // const handleVoteUpdate = async (event) => {
    //   event.preventDefault(); 
    //   let NumVoteStr = stringifyForDisplay(NumVotes);
    //   console.log(NumVoteStr);
    //   try {
    //     await updateProject({variables: { votes: NumVotes}});
    //     navigate("/discover");
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }

    const handleClickVote = async (event) => {
      event.preventDefault();
      if ( userVoted === false ) {
          setAddVote((addVote + 1 ));
          setUserVoted(true);
        } else if ( userVoted === true ) {
          setAddVote((addVote - 1 ));
          setUserVoted(false);
      }
    };

    const stripeDonate =  (donationIndex) => {
        console.log(donationIndex)
        fetch('/donation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    { id: donationIndex, quantity: 1}
                ]
            })
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            console.log(url)
            window.location = url;
        }).catch(e => {
            console.error(e.error)
        })
    };

    const handleProjectDelete = async (projectId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null; // checks if the user is logged in

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeProject({
                variables: { projectId }
            });
            console.log(`Successfully Removed `, data);
            removeProjectId(projectId); // remove project from local storage
            navigate("/profile");

        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <h2>Fire is starting...</h2>;
    };
    if (error) {
      return `Submission error! ${error.message}`
    };
    

// JSX Page Returned
    return (
        <Container sx={{backgroundColor: "var(--ComponentGBColor)", height: 'auto', padding: 2}}>
            <Card sx={{ maxWidth: 1250, backgroundColor: "var(--ComponentGBColor)" }}>
                <CardContent>
                    <ThemeProvider theme={theme}>
                        <Typography gutterBottom variant="h3" component="div" sx={{textAlign: 'center'}}>
                            {singleProject.title} <br />                        
                        </Typography>
                        <br/>
                        <Typography gutterBottom variant="p" component="div" sx={{textAlign: 'center'}}>
                            <p><span><CalendarMonthOutlinedIcon /></span> Project created: {singleProject.createdAt}</p>
                        </Typography>
                        <br/>
                        <Typography sx={{textAlign: 'center'}} variant="body1">
                            {singleProject.description} <br />
                        </Typography>
                    </ThemeProvider>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                  <a
                    underline='none'
                    href={singleProject.gitRepo}
                    target="_blank" 
                    rel="noopener noreferrer">
                    <Button 
                      variant="outlined"
                      underline='none'>
                      GitHub Repo
                    </Button>
                  </a>
                </CardActions>
                <br/>
                {/* Conditional Rendering for whether User is logged in */}
                <CardContent>
                    <ThemeProvider theme={theme}>
                        <Typography gutterBottom variant="body1" component="div" sx={{textAlign: 'center'}}>
                            Funding Goal: ${singleProject.fundingGoal} <br />
                        </Typography>
                        <br />
                        <Typography variant="body1" sx={{textAlign: 'center'}}>
                            Current Funding: ${singleProject.currentFunds} <br />
                        </Typography>
                        <br />
                        {Auth.loggedIn() ? (
                            <Link to='/profile'>
                                <Button 
                                  variant="contained"
                                  // onClick={handleVoteUpdate}
                                >
                                    <ChevronLeftIcon/> Go Back
                                </Button>
                            </Link> 
                        ) : (
                            <Link to='/discover'>
                                <Button 
                                  variant="contained"
                                  // onClick={handleVoteUpdate}
                                >
                                    <ChevronLeftIcon/> Go Back
                                </Button>
                            </Link> 
                        )}
                    </ThemeProvider>
                </CardContent>
            </Card>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                margin={2}
            >
                <Button 
                    variant="contained" 
                    color="success"
                    onClick={() => stripeDonate(singleProject._id)}
                    >
                    <AttachMoneyOutlinedIcon /> Fund Me
                </Button>
                {Auth.loggedIn() && singleProject.userId === Auth.getProfile().data._id ? (
                    <Button 
                        variant="outlined" 
                        color="error"
                        onClick={() => handleProjectDelete(singleProject._id)}>
                        <DeleteIcon /> Delete
                    </Button> ) 
                    : null }         
                    <Chip 
                        icon={<LocalFireDepartmentOutlinedIcon 
                        variant="outlined" 
                        sx={{width:"50px"}}/>} 
                        onClick={handleClickVote}
                        label={NumVotes} 
                        sx={{height:"3em"}} />
            </Stack>
        </Container>
    )
};

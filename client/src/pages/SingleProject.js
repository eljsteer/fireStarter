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
import LocalFireOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import LocalFireIcon from '@mui/icons-material/LocalFireDepartment';

import Auth from "../utils/auth";
import { removeProjectId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { REMOVE_PROJECT, UPDATE_VOTES } from '../utils/mutations';
import { QUERY_SINGLE_PROJECT, QUERY_ME } from '../utils/queries';
import { orange } from '@mui/material/colors';
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
    const singleProject = data?.singleProject || {};
    let [userVoted, setUserVoted] = useState(false);
    let [ addVote, setAddVote] = useState(0);
    let votesInteger = parseInt(singleProject.votes);
    let NumVotes = votesInteger+addVote;

    const [updateVotes] = useMutation(UPDATE_VOTES);

    const [removeProject] = useMutation(REMOVE_PROJECT, {
        refetchQueries: [
            {query: QUERY_ME}
        ]
    });

    const handleClickVote = async (event) => {
      event.preventDefault();

      const token = Auth.loggedIn() ? Auth.getToken() : null; // checks if the user is logged in

      if (!token) {
        navigate("/login");
        return false;
      } else if ( userVoted === false ) {
          setAddVote((currentVote) => currentVote + 1 );
          setUserVoted(true);
        } else if ( userVoted === true ) {
          setAddVote((currentVote) => currentVote - 1);
          setUserVoted(false);
        }

      try {
        await updateVotes({variables: { votes: NumVotes, projectId: id}});
      } catch (err) {
        console.log(err)
      };
    };

    // const stripeDonate =  (donationIndex) => {
    //     console.log(donationIndex)
    //     fetch('/donation', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             items: [
    //                 { id: donationIndex, quantity: 1}
    //             ]
    //         })
    //     }).then(res => {
    //         if (res.ok) return res.json()
    //         return res.json().then(json => Promise.reject(json))
    //     }).then(({ url }) => {
    //         console.log(url)
    //         window.location = url;
    //     }).catch(e => {
    //         console.error(e.error)
    //     })
    // };

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
            <Card sx={{ maxwidth: 1250, backgroundColor: "var(--ComponentGBColor)" }}>
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
                {/* <Button 
                    variant="contained" 
                    color="success"
                    onClick={() => stripeDonate(singleProject._id)}
                    >
                    <AttachMoneyOutlinedIcon /> Fund Me
                </Button> */}
                {Auth.loggedIn() && singleProject.userId === Auth.getProfile().data._id ? (
                    <Button 
                        variant="outlined" 
                        color="error"
                        onClick={() => handleProjectDelete(singleProject._id)}>
                        <DeleteIcon /> Delete
                    </Button> ) 
                    : null }         
                    <Chip 
                        icon={userVoted ? <LocalFireIcon variant="outlined" style={{ width:"35px", height:"35px", color: orange[900]}} /> : <LocalFireOutlinedIcon variant="outlined" style={{width:"35px"}}/>} 
                        onClick={handleClickVote}
                        label={NumVotes} 
                        
                        sx={{height:"3.2em", width:"7em"}} 
                    />
            </Stack>
        </Container>
    )
};

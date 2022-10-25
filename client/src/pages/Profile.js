import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

// >>------------------>>
// Profile Page Code
// >>------------------>>

// Page Material UI Theme
let theme = createTheme();
theme = responsiveFontSizes(theme);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#0c1012',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Profile() {
  const {loading, data} = useQuery(QUERY_ME);
  
  if (loading) {
    return <div>Fire is starting...</div>;
  }
  
  const allUserProjects = data?.me.userProjects || [];

  const welcomeUser = `${data.me.firstName} ${ data.me.lastName}`

// JSX Page Returned
  return (
    <Container sx={{height: '100vh'}}>
      <Item>
        <ThemeProvider sx={{maxWidth: "auto"}} theme={theme} >
          <Typography variant="h2" sx={{margin: 5}}>Welcome {welcomeUser}</Typography>
          <Link to='/addproject'>
            <Button variant="contained" sx={{margin: 2}}><AddIcon /> Add a project</Button>
          </Link>
          <Link to='/adduserinfo' >
            <Button variant="contained" sx={{margin: 2}}><ModeEditIcon />  Update User</Button>
          </Link>
        </ThemeProvider>
      </Item>      

      <Box sx={{ flexGrow: 1, margin: 3, }}>
        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{display: 'flex', justifyContent:"center", alignItems:"top"}}>
          {allUserProjects.map((project, i) => (
            <Grid sx={{ maxWidth: 500 }} xs={12} sm={12} md={10}>
              <Link
                to={`/project/${project._id}`}
                underline="none">
                <Item
                  xs={12}
                  underline="none">
                  <ProjectCard 
                    key={i}
                    title={project.title}                
                    description={project.description}
                    fundingGoal={project.fundingGoal}
                  />
                </Item>
              </Link>            
            </Grid>
          ))}        
        </Grid>
      </Box>
    </Container>    
  );
}
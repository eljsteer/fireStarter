import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../utils/queries';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#0c1012',
    ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Discover() {
  const {loading, data} = useQuery(QUERY_PROJECTS, {
    refetchQueries: [
      {query: QUERY_PROJECTS}
  ]
  });

  const allProjects = data?.userProjects || [];
  
  if (loading) {
    return <h2>Fire is starting...</h2>;
  }
  
  return (
    <Container sx={{height: '100vh'}}>
      <Item>
        <ThemeProvider sx={{maxWidth: "auto"}} theme={theme} >
          <Typography variant="h3" sx={{margin: 5}}>PROJECTS</Typography>
        </ThemeProvider>
      </Item>
    
      <Box sx={{flexGrow: 1,  padding: 2 }}>
        <Grid 
          container 
          sx={{display: 'flex', justifyContent:"center", alignItems:"top"}} 
          spacing={{ xs: 2, md: 3 }} 
          columns={{ xs: 4, sm: 8, md: 12 }}
          >
          {allProjects.map((project, i) => (
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
      <br/>
      <br/>
    </Container>    
  );
}
import React from 'react';
import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
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
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const {loading, data} = useQuery(QUERY_PROJECTS);

  if (loading) {
    return <div>Fire is starting...</div>;
  }

  const allProjects = data?.userProjects || [];

  return (
    <>
      <Item>
        <ThemeProvider sx={{maxWidth: "auto"}} theme={theme} >
          <Typography variant="h2" sx={{margin: 5}}>Welcome to FireStarter</Typography>
          <typography>Hello</typography>
          <Typography variant="h5" sx={{margin: 5}}>A DAO inspired application to connect developers and light the spark of innovation for projects</Typography>
        </ThemeProvider>
      </Item>

      <Box sx={{ flexGrow: 1,  padding: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {allProjects.map((project, i) => (
            <Grid sx={{ maxWidth: 500 }} xs={12} sm={12} md={10}>
              <Link
                to={`/project/${project._id}`}
                underline="none">
                <Item
                  xs={12}
                  underline="none">
                  <Carousel 
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
    </>    
  );
};

export default Home;

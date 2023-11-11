import React from 'react';
import CarouselHome from '../components/Carousel';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Container, Grid } from '@mui/material';

// >>-------------------->>
// Home Page Code
// >>-------------------->>

// Page Material UI Theme
let theme = createTheme();
theme = responsiveFontSizes(theme);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--ComponentGBColor)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

 // JSX Page Returned
const Home = () => {
  return (
    <Container sx={{maxwidth: "auto", height: '100vh'}}>
      <Item>
        <ThemeProvider sx={{maxwidth: "auto"}} theme={theme} >
          <Typography variant="h2" sx={{margin: 5}}>Welcome to FireStarter</Typography>
          <Typography variant="h6" sx={{margin: 2}}> We're a DAO (decentralised autonomous organisation) inspired application to connect a community of developers and contributors to assist in lighting the spark of innovation for projects.</Typography>
          <br />
          {/* <Typography variant="h6" sx={{margin: 2}}>Discover projects you want to help turn into a reality. Firestarter is a community owned and operated platform, which enables projects you want to see come to life, through funding by members of the community. A space where developers and contributors become connected by a common vision. Discover a project you're passionate about or create a project you want to see come to life. The opportunities are endless.</Typography> */}
        </ThemeProvider>
      </Item>
  {/* Carousel Component for HotProjects */}
      <Item maxwidth="auto" sx={{ objectFit: 'cover', flexGrow: 1 }}>
        <Grid sx={{ maxwidth: 'auto' }} xs={12} sm={12} md={10}>
          <Item>
            <CarouselHome />
          </Item>
        </Grid>
      </Item>
      <br/>
      <br/>
    </Container>   
  );
};

export default Home;

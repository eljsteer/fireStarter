import React from 'react';
import CarouselHome from '../components/Carousel';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Container, Grid } from '@mui/material';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '##121212' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  return (
    <Container sx={{maxWidth: "auto"}}>
      <Item>
        <ThemeProvider sx={{maxWidth: "auto"}} theme={theme} >
          <Typography variant="h2" sx={{margin: 5}}>Welcome to FireStarter</Typography>
          <Typography variant="h6" sx={{margin: 2}}> We're a DAO (decentralised autonomous organisation) inspired application to connect a community of developers and contributors to assist in lighting the spark of innovation for projects.</Typography>
          <br />
          <Typography variant="h6" sx={{margin: 2}}>Discover projects you want to help turn into a reality. Firestarter is a community owned and operating platform, which enables projects you want to see come to life become funded by members of the community. A space where developers and contributors become connected by a common vision. Discover a project you're passionate about or create a project you want to see come to life. The opportunities are endless.</Typography>
        </ThemeProvider>
      </Item>

      <Item maxWidth="auto" sx={{ objectFit: 'cover', flexGrow: 1 }}>
        <Grid sx={{ maxWidth: 'auto' }} xs={12} sm={12} md={10}>
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

import React from 'react';
import CarouselHome from '../components/Carousel';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// import { useQuery } from '@apollo/client';
// import { QUERY_PROJECTS } from '../utils/queries';
import { Box, Container, Grid } from '@mui/material';

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
  // const {loading, data} = useQuery(QUERY_PROJECTS);

  // if (loading) {
  //   return <div>Fire is starting...</div>;
  // }

  return (
    <Container sx={{maxWidth: "auto"}}>
      <Item>
        <ThemeProvider sx={{maxWidth: "auto"}} theme={theme} >
          <Typography variant="h2" sx={{margin: 5}}>Welcome to FireStarter</Typography>
          <Typography variant="h5" sx={{margin: 5}}>A DAO inspired application to connect developers and light the spark of innovation for projects</Typography>
        </ThemeProvider>
      </Item>

      <Container maxWidth="xl" sx={{ flexGrow: 1,  margin: 5 }}>
        <Grid sx={{ maxWidth: 1000 }} xs={12} sm={12} md={10}>
          <Item>
            <CarouselHome />
          </Item>
        </Grid>
      </Container>
      <br/>
      <br/>
    </Container>   
  );
};

export default Home;

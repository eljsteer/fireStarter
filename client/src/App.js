import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddUserInfo from './pages/AddUserInfo';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import AddProject from './pages/AddProject';
import SingleProject from './pages/SingleProject';

// >>------------------>>
// Main App Root Page Code
// >>------------------>>

// create HTTP link for graphQL
const httpLink = createHttpLink({
  uri: '/graphql',
});

// authLink variable to check local storage for token 
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers, 
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: '/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider
      theme={darkTheme}
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs">
      <CssBaseline />
      <div class="bg_image">
        <Router>
          <div>          
            <Navigation />
            <div className="container">
              <Routes>
                <Route 
                  path="/" 
                  element={<Home />}
                />
                <Route 
                  path="/login" 
                  element={<Login />}
                />
                <Route 
                  path="/signup" 
                  element={<Signup />}
                />
                <Route 
                  path="/discover" 
                  element={<Discover />}
                />
                <Route 
                  path="/adduserinfo" 
                  element={<AddUserInfo />}
                />
                <Route 
                  path="/profile" 
                  element={<Profile />}
                />
                <Route 
                  path="/addproject" 
                  element={<AddProject />}
                />
                <Route 
                  path="/project/:id" 
                  element={<SingleProject />}
                />
              </Routes>
            </div> 
            <Footer />           
          </div>
        </Router>
      </div>        
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

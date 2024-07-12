// src/components/HomePage.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Image from "next/image";
import Navbar from './components/Navbar';
import Link from 'next/link'

const home = () => {
  return (
    <>
 
       <Navbar/>
     
      <Container maxWidth="lg" sx={{ mt: 40}}>
        <Grid container spacing={12} alignItems="center">
        <Grid item xs={12} md={6}>
          <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/taskhome.png"
          alt="login.js Logo"
          width={580}
          height={337}
          priority
        />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Task Manager
            </Typography>
            <Typography variant="h5" paragraph>
              Manage your tasks efficiently and effectively. Create, edit, delete, and view your tasks all in one place.
            </Typography>
            <Box mt={2}>
                <Link href="/login" passHref>
                <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
                Get Started
                </Button>
                </Link>
      
           
              <Button variant="outlined" color="primary" size="large">
                Learn More
              </Button>
            </Box>
          </Grid>
        
        </Grid>
      </Container>
    </>
  );
};

export default home;

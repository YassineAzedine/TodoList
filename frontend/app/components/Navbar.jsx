'use client'
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    
    router.push('/register');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" color="inherit" underline="none" sx={{ '&:hover': { color: 'secondary.main' } }} passHref>
            Task Manager
          </Link>
        </Typography>
        <Button color="inherit" onClick={handleSignIn}>Sign In</Button>
        <Button color="inherit" onClick={handleSignUp}>Sign Up</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

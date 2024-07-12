import React from 'react'
import LoginForm from '../components/LoginForm'
import Navbar from '../components/Navbar';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function login() {
  return (
    <>
    <Navbar/>
    
    <Container maxWidth="sm">
    <LoginForm />

    </Container>
</>
  )
}

export default login
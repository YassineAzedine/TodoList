

import React from 'react'
import RegisterForm from '../components/RegisterForm'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';

function register() {
  return (
    <>
    
    <Navbar/>
    <Container maxWidth="sm">
    <RegisterForm />

    </Container>
    </>
  )
}

export default register
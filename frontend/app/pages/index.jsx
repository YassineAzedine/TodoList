// pages/index.js
'use client';
import Link from 'next/link'
import { Container, Box, Typography, Button } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Our Application
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link href="/auth/login" passHref>
            <Button variant="contained" sx={{ mr: 2 }}>
              Login
            </Button>
          </Link>
          <Link href="/auth/register" passHref>
            <Button variant="contained">
              Register
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

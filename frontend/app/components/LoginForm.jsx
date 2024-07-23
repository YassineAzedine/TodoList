'use client';

// components/LoginForm.js

import Link from 'next/link';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from '../services/authService';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);

      if (response && response.access_token) {
        // Store token in localStorage for persistence
        localStorage.setItem('token', response.access_token);

        toast.success('Login successful! Redirecting...', {
          autoClose: 2000,
        });

        setTimeout(() => {
          router.push('/todos'); // Redirect to the dashboard after successful login
        }, 2000);
      } else {
        // Handle specific error messages from the server
        if (response && response.message) {
          toast.error(response.message);
        } else {
          toast.error('No token received. Login failed.');
        }
      }

      console.log('Login response:', response);
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 15, border: '20px solid #1976d2', boxShadow: 3 }} p={2}>
      <ToastContainer />
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/login.svg"
        alt="Login Logo"
        width={580}
        height={337}
        priority
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Link href="/register" passHref>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Link>
    </Box>
  );
}

export default LoginForm;

'use client';

// components/RegisterForm.js
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser, logRegisterEvent } from '../services/authService';

function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerPromise = registerUser(email, password, username);
      // const logPromise = logRegisterEvent(email);

      const [registerResponse, logResponse] = await Promise.all([registerPromise]);

      console.log('Registration successful:', registerResponse);
      console.log('Log event successful:', logResponse);

      toast.success('Registration successful! Redirecting to login page...', {
        autoClose: 2000,
      });

      if (registerResponse) {
        setTimeout(() => {
          router.push('/login'); // Redirect to login page after successful registration
        }, 2000);
      }
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Error registering. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 15, border: '20px solid #1976d2', boxShadow: 3 }} method="post" p={2}>
      <ToastContainer />
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/register.svg"
        alt="Register Logo"
        width={580}
        height={337}
        priority
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="User Name"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
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
        Sign Up
      </Button>
      <Link href="/login" passHref>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Link>
    </Box>
  );
}

export default RegisterForm;

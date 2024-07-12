
'use client';

// components/RegisterForm.js
import Link from 'next/link'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 function RegisterForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      const response = await axios.post('http://localhost:4040/api/auth/register', { email, password , username})
      console.log('Registration successful:', response.data)

      toast.success('Registration successful! Redirecting to login page...', {
   
      });
      if (response.data) {
        setTimeout(() => {
          router.push('/login'); // Rediriger vers la page de login après l'inscription réussie
        }, 3000); // Attendre 3 secondes avant de rediriger
      }
    } catch (error) {
      console.error('Error registering:', error)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 15  ,border: '20px solid #1976d2' , boxShadow: 3}}  method="post"     p={2} >
         <ToastContainer />
    <Image
    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    src="/register.svg"
    alt="login.js Logo"
    width={580}
    height={337}
    priority
  />
  <TextField
  margin="normal"
  required
  fullWidth
  label="user Name"
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
  Sign UP
</Button>
<Link href="/login" passHref>

<Button
  type="submit"
  fullWidth
  variant="outlined"
  sx={{ mt: 3, mb: 2 }}

>
Sign In

</Button>
</Link>

</Box>
  )
}
export default RegisterForm
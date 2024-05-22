import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { login } from '../firebaseAuth'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      alert('Log in successfully')
      navigate('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/invalid-credential':
          setError('Invalid credentials.');
          break;
        default:
          setError(err.message);
      }
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, height: 425, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
          Login
        </Button>
        <Button href="/signup" type='submit' variant='contained' color='primary' fullWidth sx={{mt: 2, mb: 2}}>
        Sign up
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
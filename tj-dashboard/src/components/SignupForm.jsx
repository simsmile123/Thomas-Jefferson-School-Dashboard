import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Divider } from '@mui/material';
import { signUp } from '../firebaseAuth'; 

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signUp(email, password, username);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('User already exists with this email');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Create an account
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enter your email to sign up for this app
      </Typography>
      <form onSubmit={handleSignUp}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          placeholder="email@domain.com"
        />
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <TextField
          label="Re-enter password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
          Sign up
        </Button>
        <Button href="/login" type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
          Log in
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;

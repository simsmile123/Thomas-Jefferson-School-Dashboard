// SignUpForm.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, Divider } from '@mui/material';
// import { signUp } from './firebaseAuth'; // ensure you have the correct path

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
//     try {
//       await signUp(email, password);
//       alert('Sign Up Successful');
//     } catch (err) {
//       setError(err.message);
//     }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h5" fontWeight="bold" component="h1" gutterBottom>
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
      </form>
      {/* <Divider>or continue with</Divider> */}
    </Box>
  );
};

export default SignUpForm;

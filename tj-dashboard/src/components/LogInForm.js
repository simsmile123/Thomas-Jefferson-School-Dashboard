// // LoginForm.js
// import React, { useState } from 'react';
// import { TextField, Button, Typography, Box, Alert } from '@mui/material';
// // import { login } from './firebaseAuth'; // ensure you have the correct path

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleLogin = (event) => {
//     event.preventDefault();
//     // try {
//     //   await login(email, password);
//     //   alert('Login Successful');
//     // } catch (err) {
//     //   setError(err.message);
//     // }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Login
//       </Typography>
//       <form onSubmit={handleLogin}>
//         <TextField
//           label="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           margin="normal"
//           required
//         />
//         {error && <Alert severity="error">{error}</Alert>}
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Login
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default LoginForm;

import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export const Footer = () => {
    return (
      <Box component="footer" sx={{ p: 2, mt: 'auto', backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="body2" align="center">
          © 2024 Team 2
        </Typography>
      </Box>
    );
  };


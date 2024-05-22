import React, { useState } from 'react'
import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { SideBar } from './SideBar.jsx';

export const Base = () => {

  

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
    <Navbar />
    <Container component="main" sx={{ flex: 1 }}>
      <Outlet />
      
    </Container>
    <Footer />
  </Box>
  )
}



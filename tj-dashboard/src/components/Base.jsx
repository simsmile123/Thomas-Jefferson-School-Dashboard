import React from 'react'
import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
export const Base = () => {
  return (
    <Box>
        <Outlet />
    </Box>
  )
}



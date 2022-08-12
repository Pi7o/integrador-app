import { Box, Typography } from '@mui/material'
import { Container } from '@mui/material'
import React from 'react'
import './index.scss'

const Footer = () => {
  return (
   <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, bottom:0 }}>
        <Container maxWidth='lg'>
            <Typography variant="h6" align="center" gutterBottom>
              Copyright 2022
            </Typography>
        </Container>
   </Box> 
  )
}

export default Footer
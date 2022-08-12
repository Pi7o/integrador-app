import React from 'react'
import './index.scss'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const theme = createTheme();

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline>
            <Container maxWidth="lg">
                <Header/>
                <main>
                   <Outlet/> 
                </main>
                <Footer/>
            </Container>
        </CssBaseline>
    </ThemeProvider>
  )
}

export default Layout
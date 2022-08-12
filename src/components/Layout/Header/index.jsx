import { Typography } from '@mui/material';
import { Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import logoPi from '../../../assets/images/Logopi7.png'; 
import './index.scss'

const Header = () => {
  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Link className='logo-link' to='/'>
            <img src = {logoPi} alt='logo'/>
        </Link>
        <Typography 
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        margin-right = "92px"
        noWrap
        sx={{ flex: 1 }}>
            Buscador con NewsApi de pi7
        </Typography>
    </Toolbar>
  )
}

export default Header
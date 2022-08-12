import './index.scss';
import React from 'react';
import { Box, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { DateTime } from "luxon";

function ANewsItem({articulo}) {
    const fecha = DateTime.fromISO(articulo.publishedAt);

  return (
    <Grid item xs={12} md={6} >
        <CardActionArea 
            component="a" 
            href={articulo.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="h2" variant="h5">
                      {articulo.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Publicado el: {fecha.toFormat('dd-MM-yyyy')} a las {fecha.toLocaleString(DateTime.TIME_24_SIMPLE)}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {articulo.description}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Continuar leyendo en {articulo.source.name}
                    </Typography>
                
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                image={articulo.urlToImage}
                alt='imagen-item'
            />
        </CardActionArea>
    </Grid>
  )
}

export default ANewsItem
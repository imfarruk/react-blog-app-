import React from 'react'
import Search from './Search';
import { Box, Grid,Divider,Typography } from '@mui/material';
import Sidebar from './Sidebar';
import Post from './Post';

const Home = () => {
  return (
    <>
    <Search/>
    <Box sx={{m:2}}>
    <Typography variant="h5">Hello,Welcome to your blog </Typography>
    <Divider sx={{my:2}}/>
   <Grid container spacing={2} mt={2}>
       <Grid item xs={12} sm={4} md={4} lg={3}>
          <Sidebar/>
          <Divider sx={{display:{xs:'flex',sm:'none'}}}/>
       </Grid>
       <Grid item xs={12} sm={8} md={8} lg={9} >
        <Grid spacing={3} container >
        {
          [1,2,3].map((posts,i)=>{
            return (
              <Grid key={i} item xs={12} sm={12} md={6} lg={4} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Post/>
              </Grid>
            )
          })
        }
        </Grid>
       </Grid>
   </Grid>
   </Box>
    </>
  )
}

export default Home
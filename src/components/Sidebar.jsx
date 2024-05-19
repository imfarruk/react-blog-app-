import { Box, Button, Chip, Divider, Typography } from '@mui/material'
import React from 'react'
import {linkStyles} from "../assets/css/muiStyles"

import { IoCreate } from "react-icons/io5";
import { GrTechnology } from "react-icons/gr";
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const handleChip = () =>{

    }
  return (
    <>
      <Box >
        <Link  to="/create-post" sx={{...linkStyles}} >
       
        <Button variant="contained" endIcon={<IoCreate/>}>Create Post</Button>
        </Link>
        <Box sx={{mt:2}} >
            <Typography> Search blog by tags</Typography>
            <Chip icon={<GrTechnology/>} label="Technology" onClick={handleChip} sx={{m:1}}/>
            <Chip icon={<GrTechnology/>} label="Fashion" onClick={handleChip} sx={{m:1}}/>
            <Chip icon={<GrTechnology/>} label="Sport" onClick={handleChip} sx={{m:1}}/>
            <Chip icon={<GrTechnology/>} label="History" onClick={handleChip} sx={{m:1}}/>
            <Chip icon={<GrTechnology/>} label="Education" onClick={handleChip} sx={{m:1}}/>
            <Chip icon={<GrTechnology/>} label="Art" onClick={handleChip} sx={{m:1}}/>
            <Chip icon={<GrTechnology/>} label="Research" onClick={handleChip} sx={{m:1}}/>
            <Chip icon={<GrTechnology/>} label="Innovation" onClick={handleChip} sx={{m:1}}/>
            <Chip icon={<GrTechnology/>} label="Space" onClick={handleChip} sx={{m:1}}/>

        </Box>
        <Divider orientation='vertical' variant="fullWidth" sx={{ opacity: 0.8,background:'red' }}/>
      </Box>
    </>
  )
}

export default Sidebar
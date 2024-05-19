import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import postImg from "../logo.svg"
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Post = () => {
  return (
    <>
     <Card sx={{ maxWidth: 345 }}>
        <Link to="/post-details" style={{textDecoration:'none',color:'inherit'}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={postImg}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign:'start'}}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      </Link>
      <Divider/>
      <Box sx={{display:'flex',flexFlow:'wrap',p:1}}>
        <Stack direction="row" sx={{alignItems:'center',pr:1}}>
        <Button size="small" endIcon={<FcLike/>} sx={{alignItems:'center'}}>Likes </Button><Typography>20</Typography>
        </Stack>
         <Stack direction="row" sx={{alignItems:'center'}}>
         <Button size="small" endIcon={<FaCommentDots/>}>Comments </Button><Typography>05</Typography>
         </Stack>
       
      </Box>
    </Card>
    </>
  )
}

export default Post
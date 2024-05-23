import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import postImg from "../logo.svg";
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";

import {getAllPost} from "../store/reducer/postReducer";
import { useDispatch, useSelector } from "react-redux";

const Post = ({post}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

const addEllipse = (str,len)=>{
  
  return  `${str.slice(0,len)} ...`
}
 
  return (
    <>
      <Card sx={{ width: 345,minHeight:360 }}>
        <Link
          to={`/post-details/${post.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={post?.photoURL}
          />
          <CardContent sx={{minHeight:140}}>
            <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'start',textWrap: 'nowrap', overflowX: 'clip'}}>
              {post?.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "start" }}
            >
              {addEllipse(post?.content,150)}
            </Typography>
          </CardContent>
        </Link>
        <Divider />
        <Box sx={{ display: "flex", flexFlow: "wrap", p: 1 }}>
          <Stack direction="row" sx={{ alignItems: "center", pr: 1 }}>
            <Button
              size="small"
              endIcon={<FcLike />}
              // sx={{ alignItems: "center", color: theme.palette.paper.primary }}
            >
              Likes{" "}
            </Button>
            <Typography>20</Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Button
              size="small"
              endIcon={<FaCommentDots />}
              // sx={{ alignItems: "center", color: theme.palette.paper.primary }}
            >
              Comments{" "}
            </Button>
            <Typography>05</Typography>
          </Stack>
        </Box>
      </Card>
    </>
  );
};

export default Post;

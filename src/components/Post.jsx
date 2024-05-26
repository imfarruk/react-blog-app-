import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import { app } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { AiFillLike } from "react-icons/ai";

const auth = getAuth(app);
const Post = ({ post }) => {
  const theme = useTheme();
  const currentuser = auth.currentUser?.uid;
  const addEllipse = (str, len) => {
    return `${str.slice(0, len)} ...`;
  };

  return (
    <>
      <Card sx={{ width: 345, minHeight: 360 }}>
        <Link
          to={`/post-details/${post.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Stack>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={post?.photoURL}
            />
            
          </Stack>

          <CardContent sx={{ minHeight: 140 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "start", textWrap: "nowrap", overflowX: "clip" }}
            >
              {post?.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "start" }}
            >
              {addEllipse(post?.content, 180)}
            </Typography>
          </CardContent>
        </Link>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexFlow: "wrap",
            p: 1,
            justifyContent: "space-evenly",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center", pr: 1 }}>
            <Button
              size="small"
              endIcon={
                currentuser === post?.likedUserId ? <FcLike /> : <AiFillLike />
              }
              // sx={{ alignItems: "center", color: theme.palette.paper.primary }}
            >
              Likes{" "}
            </Button>
            <Typography>{post?.totalLikes}</Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Button
              size="small"
              endIcon={<FaCommentDots />}
              // sx={{ alignItems: "center", color: theme.palette.paper.primary }}
            >
              Comments{" "}
            </Button>
            <Typography>{post?.totalComments}</Typography>
          </Stack>
        </Box>
      </Card>
    </>
  );
};

export default Post;

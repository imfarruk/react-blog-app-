import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import imgPost from "../logo.svg";
import { BiSolidLike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import { FaShareSquare } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Comments from "./Comments";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../store/reducer/postReducer";
import moment from "moment";
import { likePost, dislikePost } from "../store/reducer/commentReducer";
import { getAllLikeComment } from "../store/reducer/commentReducer.js";
import { getAllComment } from "../store/reducer/allCommentReducer.js";
import { toast } from "react-toastify";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  color: !expand ? "grey" : "red",
  //   marginLeft: "auto",
  fontSize: 16,
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { likedUser, totalLiked } = useSelector((state) => state.likes);
  const { comments, totalComments } = useSelector((state) => state.comments);

  const { posts } = useSelector((state) => state.post);
  const [expanded, setExpanded] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [postDetailVal, setPostDetailVal] = useState("");
  const [loading, setLoading] = useState(true);


  

  useEffect(() => {
    dispatch(getPostById(id)).then((res) => {
      setPostDetailVal(res.payload);
      setUserId(res.payload?.userId);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    dispatch(getAllComment(id));
  }, []);

  useEffect(() => {
    console.log("call-1");
    dispatch(getAllLikeComment(id));
  });
  useEffect(() => {
    navigator.clipboard.writeText(window.location.href)
  },[]);

  const shareBlog =async ()=>{
    if (navigator.share) {
      
        await navigator.share({
          title: 'Awesome Blog',
          text: 'Check out this awesome page!',
          url: window.location.href,
        });
      }
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const likeThePost = () => {
    if(!isAuthenticated){
      toast.info('login first to like posts')
    }
    let userId = postDetailVal?.userId;
    dispatch(likePost({ id, userId }));
  };

  const unlikeThePost = () => {
    let userId = postDetailVal?.userId;
    dispatch(dislikePost({ id, userId }));
  };

  return (
    <>
      <Box my={5}>
        {!loading && (
          <Container maxWidth="md">
            <Card>
              <Stack direction="row" sx={{ p: 1, display: "flex" }}>
                <Avatar
                  sx={{
                    bgcolor: "red",
                    width: 50,
                    height: 50,
                    display: "flex",
                    mr: 2,
                  }}
                  aria-label="recipe"
                >
                  <img
                    src={postDetailVal?.userDetails?.photoURL}
                    alt="profile-detail"
                    width="100%"
                  />
                </Avatar>
                <Stack sx={{ alignItems: "start" }}>
                  <Typography sx={{ color: "text.primary" }}>
                    {postDetailVal?.userDetails?.userName}
                  </Typography>
                  <Typography variant="body2">
                    {moment(postDetailVal?.timestamp).format("Do MMMM YYYY")}
                  </Typography>
                </Stack>
                <Box style={{ marginLeft: "auto" }}>
                  {isAuthenticated && user?.uid === postDetailVal?.userId ? (
                    <Link
                      to={`/edit-post/${id}`}
                      style={{ marginLeft: "auto" }}
                    >
                      <Button endIcon={<FaEdit />} variant="contained">
                        Edit
                      </Button>
                    </Link>
                  ) : (
                    <Button endIcon={<FaEdit />} variant="contained" disabled>
                      Edit
                    </Button>
                  )}
                </Box>
              </Stack>
              <Divider />
              <CardMedia
                component="img"
                height="250"
                image={postDetailVal?.photoURL}
                alt="post-image"
              />
              <CardContent>
                <Divider>
                  <Typography  sx={{fontSize:{sm:18,xs:16}, textTransform:'capitalize',border: "1px solid", px: "30px", py:'10px' }}>
                  <small> Category : </small> <code style={{textDecoration:'underline'}}>{postDetailVal?.type}</code>
                  </Typography>
                </Divider>

                <Typography sx={{fontSize: {sm:22,xs:20}, textAlign: "start",mt:2 }}>
                Title : {postDetailVal?.title}
                </Typography>
                <Divider />
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ textAlign: "justify", fontSize: {sm:18,xs:16},mt:2 }}
                >
                  {postDetailVal?.content}
                </Typography>
              </CardContent>
              <CardActions sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                <>
                  {likedUser ? (
                    <Button
                      startIcon={<FcLike />}
                      aria-label="add to favorites"
                      sx={{
                        alignItems: "center",
                        // color: theme.palette.paper.primary,
                      }}
                      onClick={unlikeThePost}
                    >
                      <Typography>{totalLiked}</Typography>
                    </Button>
                  ) : (
                    <Button
                      startIcon={<BiSolidLike />}
                      aria-label="add to favorites"
                      sx={{
                        alignItems: "center",
                        // color: theme.palette.paper.primary,
                      }}
                      onClick={likeThePost}
                    >
                      <Typography>{totalLiked}</Typography>
                    </Button>
                  )}
                </>
                <Tooltip title="Comment">
                  <Button
                    startIcon={<FaCommentDots />}
                    aria-label="comments"
                    sx={{
                      alignItems: "center",
                      // color: theme.palette.paper.primary,
                    }}
                  >
                    <Typography>{totalComments}</Typography>
                  </Button>
                </Tooltip>
                <Tooltip title="Share">
                  <Button
                    startIcon={<FaShareSquare />}
                    aria-label="share"
                    sx={{
                      alignItems: "center",
                      // color: theme.palette.paper.primary,
                    }}
                    onClick={shareBlog}
                  ></Button>
                </Tooltip>
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "end",
                    justifyContent: { xs: "center", sm: "end" },
                    width: "100%",
                  }}
                >
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show comments"
                  >
                    view all comments <MdExpandMore />
                  </ExpandMore>
                </Box>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>All comments :</Typography>
                  <Box>
                    <Comments id={id} userId={userId} />
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
          </Container>
        )}
        {loading && <CircularProgress />}
      </Box>
    </>
  );
};

export default PostDetails;

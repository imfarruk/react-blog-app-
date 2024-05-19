import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import imgPost from "../logo.svg";
import { BiSolidLike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import { FaShareSquare } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Comments from "./Comments";
import { Link } from "react-router-dom";

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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Box my={5}>
        <Container maxWidth="md">
          {/* <Paper>
             <img src={imgPost} alt="post-details"/>
          </Paper> */}
          <Card>
            {/* <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red",width: 56, height: 56,display:'flex' }} aria-label="recipe">
                  F
                </Avatar>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
              sx={{
                '& .MuiCardHeader-content':{
                    textAlign:'start'
                },
              }}
            /> */}
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
                F
              </Avatar>
              <Stack sx={{ alignItems: "start" }}>
                <Typography>Farhan Haider Khan</Typography>
                <Typography>17/5/2024</Typography>
              </Stack>
              <Link to="/edit-post" style={{ marginLeft: "auto" }}>
                <Button endIcon={<FaEdit />}>Edit</Button>
              </Link>
             
            </Stack>
            <Divider/>
            <CardMedia
              component="img"
              height="250"
              image={imgPost}
              alt="Paella dish"
            />
            <CardContent>
            <Divider/>
                   <Typography>Technology</Typography>
                <Divider/>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like. This impressive paella is a
                perfect party dish and a fun meal to cook together with your
                guests. Add 1 cup of frozen peas along with the mussels, if you
                like. This impressive paella is a perfect party dish and a fun
                meal to cook together with your guests. Add 1 cup of frozen peas
                along with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}>
              <Tooltip title="Likes">
                <IconButton aria-label="add to favorites">
                  <BiSolidLike /> <Typography>100</Typography>
                </IconButton>
              </Tooltip>
              <Tooltip title="Comment">
                <IconButton aria-label="comments">
                  <FaCommentDots /> <Typography>10</Typography>
                </IconButton>
              </Tooltip>
              <Tooltip title="Share">
                <IconButton aria-label="share">
                  <FaShareSquare />
                </IconButton>
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
                  <Comments />
                </Box>
              </CardContent>
            </Collapse>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default PostDetails;

import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import imgPost from "../logo.svg";
import {
  deleteTheComment,
  doCommentOnPost,
  getAllComment,
} from "../store/reducer/allCommentReducer";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const CommentLayout = ({ commentVal, postId,change }) => {
  const dispatch = useDispatch();
  const [openAction, setOpenAction] = useState(false);
  const {isAuthenticated} = useSelector((state)=>state.auth)

  const openActionButton = () => {
    setOpenAction(!openAction);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const deleteComment = (data) => {
    setAnchorElNav(null);
    if(!isAuthenticated){
      toast.info('You can not delete comments ! Login First')
      
    }else{
      let datas = {
        id: postId,
        commentId: data,
      };
      dispatch(deleteTheComment(datas));
      // setCall(!call)
      change()
    }

    
  };

 

  const formatDate = (timestamp) => {
    const date = new Date(timestamp); // Convert Firestore timestamp to JS Date
    return date.toLocaleString(); // Format the date
  };

  return (
    <>
      {/* <Grid item xs={12} > */}
      <Grid item xs={2} sm={1}>
        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
          <img src={commentVal?.photoURL|| imgPost} alt="comment-view" width="100%" />
        </Avatar>
      </Grid>
      <Grid item xs={10} sm={11} >
        <Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              {commentVal?.userName || commentVal?.userEmail}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography sx={{ fontSize: "12px", opacity: 0.7, pl: 1 }}>
                {" "}
                {moment(commentVal?.createdDate).startOf("minutes").fromNow()}
               
                {/* {formatDate(commentVal?.createdDate)} */}
              </Typography>

              <IconButton
                size="small"
                aria-label="menu list"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <BsThreeDotsVertical />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem
                  sx={{
                    width: "fit-content",
                    py: 0,
                  }}
                  // key={page}
                >
                  <Button
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={() => deleteComment(commentVal?.id)}
                  >
                    Delete <MdDelete />
                  </Button>
                </MenuItem>
              </Menu>
            </Stack>
          </Box>
          <Typography sx={{ textAlign: "left", fontSize: "14px" }}>
            {commentVal?.message}
          </Typography>
        </Stack>
      </Grid>
      {/* </Grid> */}
    </>
  );
};

const Comments = ({ id, userId }) => {
  const dispatch = useDispatch();
  const { comments,  } = useSelector((state) => state.comments);
  const {isAuthenticated} = useSelector((state)=>state.auth)
  const [message, setMessage] = useState("");
  const [call,setCall] = useState(false);
  const [loading,setLoading] = useState(true);


  useEffect(() => {
    dispatch(getAllComment(id));
    setLoading(false)
  }, [dispatch, id,call]);

  const commentOnPost = () => {
    if(!isAuthenticated){
      toast.info('You can not comments on post. ! Login First')
    }else{

    dispatch(doCommentOnPost({ id, message })).then((res) => {
      setCall(!call)
      
    });
  }
  setMessage("");
  };

  const changeCall = ()=>{
    setCall(!call)
  }

  return (
    <>
      <Box sx={{}}>
        {/* <Stack> */}
        <Box sx={{ display: "flex" }}>
          <Grid container spacing={2}>
            {!loading &&
              comments.length !== 0 &&
              comments.map((msg, i) => {
                return (
                  // <Grid key={i} item xs={12}>
              
                    <CommentLayout key={i} commentVal={msg} postId={id} setCall={setCall} change={(e)=>changeCall()}/>
                    
                  // </Grid>
                );
              })}
              {!loading && comments?.length === 0 && (
            <Grid item xs={12}>
              <Typography>Comments are empty..</Typography>
              <Typography>Share your view..</Typography>
            </Grid>
          )}
          {loading && (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          )}
          </Grid>
          
        </Box>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={2} mt={2}>
          <TextField
            multiline
            name="comment"
            rows={2}
            placeholder="Please share your view"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button endIcon={<FaLocationArrow />} onClick={commentOnPost}>
            Submit
          </Button>
        </Stack>

        {/* </Stack>  */}
      </Box>
    </>
  );
};

export default Comments;

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { linkStyles } from "../assets/css/muiStyles";
import lightTheme from "../Theme/lightTheme";
import { IoCreate } from "react-icons/io5";
import { GrTechnology } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  backgroundStyle,
  textStyle,
  navbarStyle,
  buttonStyle,
  cardStyle,
} from "../store/reducer/themeReducer";
import { getAllTags } from "../store/reducer/tagsReducer";
import {HashLoader} from "react-spinners"
import { getAllPost, postViewByTags } from "../store/reducer/postReducer";

const InputStyle = styled("input")({
  width: "100%",
  outline: "none",
  border: "none",
  background: "none",
});

const Sidebar = () => {
  const dispatch = useDispatch();
  // const { theme } = useSelector((state) => state.appTheme);
  const { tags,loading } = useSelector((state) => state.tag);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [themeOpen, setThemeOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    lightTheme.palette.background.default
  );
  const [textColor, setTextColor] = useState(lightTheme.palette.text.primary);
  const [buttonColor, setButtonColor] = useState(
    lightTheme.palette.text.primary
  );
  const [navbarColor, setNavbarColor] = useState(
    lightTheme.palette.primary.main
  );
  const [cardColor, setCardColor] = useState(
    lightTheme.palette.background.paper
  );

  useEffect(()=>{
    dispatch(getAllTags())
  },[dispatch])

  const handleTags = (tagId) => {
    dispatch(postViewByTags(tagId))
  };

  return (
    <>
      <Box>
        {isAuthenticated ? (
          <Link
            to="/create-post"
            sx={{ ...linkStyles }}
            style={{ color: isAuthenticated ? "" : "red" }}
          >
            <Button variant="contained" endIcon={<IoCreate />}>
              Create Post
            </Button>
          </Link>
        ) : (
        
           <Tooltip title="You don't have permission to create post. Login first">
           <span>
             <Button variant="contained" endIcon={<IoCreate />} disabled>Create Post</Button>
           </span>
         </Tooltip>
        
        )}

        <Box sx={{ my: 2 }}>
          <Typography sx={{  mb: 1,color:'text.primary' }} >
            Customize this website.
          </Typography>
          <Button variant="contained" onClick={() => setThemeOpen(true)}>
            Click
          </Button>
          <Dialog
            open={themeOpen}
            onClose={() => setThemeOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" >
              Customize theme according to your choice.
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {/* {theme === "dark" ? (
                  <Box>
                    <Typography sx={{ textAlign: "center" }}>
                      {" "}
                      you can't change theme color
                    </Typography>
                  </Box>
                ) : ( */}
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={5}>
                      <Typography >
                        Background :
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={7}>
                      {" "}
                      <InputStyle
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => {
                          dispatch(backgroundStyle(e.target.value));
                          setBackgroundColor(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={5}>
                      <Typography >
                        Text :
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={7}>
                      {" "}
                      <InputStyle
                        type="color"
                        value={textColor}
                        onChange={(e) => {
                          dispatch(textStyle(e.target.value));
                          setTextColor(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={5}>
                      <Typography >
                        Navbar :
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={7}>
                      {" "}
                      <InputStyle
                        type="color"
                        value={navbarColor}
                        onChange={(e) => {
                          dispatch(navbarStyle(e.target.value));
                          setNavbarColor(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={5}>
                      <Typography >
                        Button :
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={7}>
                      {" "}
                      <InputStyle
                        type="color"
                        value={buttonColor}
                        onChange={(e) => {
                          dispatch(buttonStyle(e.target.value));
                          setButtonColor(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={5}>
                      <Typography >
                        Card :
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={7}>
                      {" "}
                      <InputStyle
                        type="color"
                        value={cardColor}
                        onChange={(e) => {
                          dispatch(cardStyle(e.target.value));
                          setCardColor(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                {/* )} */}
              </DialogContentText>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={() => setThemeOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography sx={{color:'text.primary'}}>
            {" "}
            Search blog by tags
          </Typography>
          {
            !loading && tags.length !== 0 && (
              <Chip
            icon={<GrTechnology />}
            label='view all post'
            onClick={()=> dispatch(getAllPost())}
            sx={{ m: 1,}}
          />
            )
          }
          <br/>
          {
            !loading && tags.length !== 0 && tags.map((tag,i)=>{
              return (
                <Chip
            icon={<GrTechnology />}
            label={tag?.tagName}
            onClick={()=>handleTags(`${tag?.tagName}`)}
            sx={{ m: 1}}
          />
              )
            })
          }
          {
            !loading && tags.length === 0 && (
              <Paper elevation={10} sx={{p:2,}}>
                 <Typography sx={{color:'text.primary'}}>Tags are not available</Typography>
              </Paper>
            )
          }
          {
            loading &&  (
              <Box sx={{display: 'flex',
                justifyContent: 'center',my:4}}>
              <HashLoader color="#36d7b7" />
              </Box>
            )
          }
        </Box>
        <Divider
          orientation="vertical"
          variant="fullWidth"
          sx={{ opacity: 0.8, background: "red" }}
        />
      </Box>
    </>
  );
};

export default Sidebar;

import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, IconButton, MenuItem, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { BiSolidLike } from 'react-icons/bi'
import { FaCommentDots, FaEdit, FaShareSquare } from 'react-icons/fa'
import imgPost from "../logo.svg";
import { MdCloudUpload, MdCreate } from 'react-icons/md';
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

const EditPost = () => {
    const [imagePreview, setImagePreview] = useState("");
    const [image, setImage] = useState("");
    const [blogContent,setBlogContent] = useState("")
  
    const changeImage = (e) => {
      let files = e.target.files[0];
      setImage(files);
      setImagePreview(URL.createObjectURL(files));
      console.log(imagePreview, "image", e.target);
    };
  
    const postBlog = () =>{}

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
                sx={{ bgcolor: "red", width: 50, height: 50, display: "flex",mr:2 }}
                aria-label="recipe"
              >
                F
              </Avatar>
              <Stack sx={{alignItems:'start'}}>
                <Typography>Farhan Haider Khan</Typography>
                <Typography>17/5/2024</Typography>
              </Stack>
              
            </Stack>
            <Divider/>
            {imagePreview?.length !==0 ? (
              <CardMedia
                component="img"
                height="250"
                image={imagePreview}
                alt="Paella dish"
              />) :(
                <CardMedia
                component="img"
                height="250"
                image={imgPost}
                alt="Paella dish"
              />
              )
            }
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<MdCloudUpload />}
              sx={{ my: 2, float: "right" }}
            >
              Upload file
              <VisuallyHiddenInput onChange={changeImage} type="file" />
            </Button>
            <CardContent>
            <Stack spacing={2} sx={{ width: "100%" }}>
                <TextField
                  defaultValue="technology"
                  fullWidth
                  select
                  placeholder="select blog type"
                >
                  <MenuItem value="technology">Technology</MenuItem>
                  <MenuItem value="sport">Sport</MenuItem>
                  <MenuItem value="research">Research</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  multiline
                  name="blogContent"
                  onChange={(e)=>setBlogContent(e.target.value)}
                  value={blogContent}
                  placeholder="Write your content"
                />
                </Stack>
            </CardContent>
            <CardActions sx={{ float: "right", px: 2 }}>
              <Button variant="contained" endIcon={<MdCreate />} onClick={postBlog}>
                {" "}
                Post
              </Button>
            </CardActions>
            
          </Card>
        </Container>
      </Box>
    </>
  )
}

export default EditPost
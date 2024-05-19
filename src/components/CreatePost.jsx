import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { FaEdit } from "react-icons/fa";
import imgPost from "../logo.svg";
import { MdCloudUpload } from "react-icons/md";
import { MdCreate } from "react-icons/md";

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

const CreatePost = () => {
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
            <CardHeader title="Welcome to Create blog" />
            <Divider />
            {imagePreview?.length !==0 && (
              <CardMedia
                component="img"
                height="250"
                image={imagePreview}
                alt="Paella dish"
              />
            )}

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
  );
};

export default CreatePost;

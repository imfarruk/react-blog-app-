import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled ,useTheme} from "@mui/material/styles";
import { FaEdit } from "react-icons/fa";
import imgPost from "../logo.svg";
import { MdCloudUpload } from "react-icons/md";
import { MdCreate } from "react-icons/md";

import {createPost} from '../store/reducer/postReducer';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllTags } from "../store/reducer/tagsReducer";
import ImageCroper from "./imageCroper";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { SyncLoader } from "react-spinners";

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
  const dispatch = useDispatch()
  const theme = useTheme();
  const navigate = useNavigate()
  const { tags,loading } = useSelector((state) => state.tag);
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [blogContent,setBlogContent] = useState("")
  const [blogTitle,setBlogTitle] = useState("")
  const [blogType,setBlogType] = useState("")
  const [saveBtnOpen, setSaveBtnOpen] = useState(false);
  const [src, setSrc] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
 const [modelOpen,setModelOpen] = useState(false)

  const handleUpload = (url) => {
    setUploadedImageUrl(url);
    setModelOpen(false)
  };

  useEffect(()=>{
    dispatch(getAllTags())
  },[])
  const changeImage = (e) => {
    
    let files = e.target.files[0];
    setImage(files);
    setImagePreview(URL.createObjectURL(files));
    setModelOpen(true)
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImagePreview(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setModelOpen(true)
    }
  };

  const postBlog = async(e) =>{
    e.preventDefault();
    const file = await fetch(uploadedImageUrl).then((res) => res.blob());
    const value={
      image:file,
      blogContent,
      blogTitle,
      blogType
    }
    if(blogContent.length !==0 && blogTitle.length !==0){
      setSaveBtnOpen(true);
      try{
        const res = await dispatch(createPost(value));
        console.log(blogContent,blogTitle,blogType,'blog',res.payload);
        toast.success('Post created')
        setSaveBtnOpen(false);
        navigate('/')
      }catch(error){
        toast.error(error)
      }
     
    }
  

  }
  const closeDialog =()=>{
    setModelOpen(!modelOpen)
  }
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
            {uploadedImageUrl?.length !==0 && (
              <CardMedia
                component="img"
                // height="260"
                image={uploadedImageUrl}
                alt="create-post"
                sx={{aspectRatio:'3/1'}}
              />
            )}

            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<MdCloudUpload />}
              sx={{ m: 2, float: "right" }}
            >
              Upload file
              <VisuallyHiddenInput accept="image/*" onChange={onSelectFile}  type="file"/>
            </Button>
             {
              modelOpen && (
                <ImageCroper closeDialogBtn={closeDialog} ImageToCrop = {imagePreview} onUpload={handleUpload}/>
                // <ReactCrop
                // src={image}
                // crop={crop}
                // ruleOfThirds
                // onImageLoaded={onImageLoaded}
                // onComplete={onCropComplete}
                // onChange={(newCrop) => setCrop(newCrop)}
                // style={{zIndex:32343}}
              // />
              )
             }
            <CardContent>
                <form>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <TextField
                  defaultValue="Technology"
                  fullWidth
                  select
                  label="Select category"
                  placeholder="Select blog category"
                  value={blogType}
                  onChange={(e)=>setBlogType(e.target.value)}
                  sx={{textAlign:'start',textTransform:'capitalize'}}
                >
                  { !loading && tags.map((tag,i)=>{
                    return (
                      <MenuItem value={tag?.tagName} sx={{textTransform:'capitalize'}}>{tag?.tagName}</MenuItem>
                    )
                  })}
                </TextField>
                <TextField
                  fullWidth
                  multiline
                  name="blogTitle"
                  label="Title"
                  onChange={(e)=>setBlogTitle(e.target.value)}
                  value={blogTitle}
                  placeholder="Blog title"
                />
                <TextField
                  fullWidth
                  multiline
                  label="Content"
                  name="blogContent"
                  onChange={(e)=>setBlogContent(e.target.value)}
                  value={blogContent}
                  placeholder="Write your content"
                />
              </Stack>
               </form>
            </CardContent>
            <CardActions sx={{ float: "right", p: 2 }}>
              <Button variant="contained" endIcon={<MdCreate />} onClick={postBlog}>
                {" "}
                Post
              </Button>
              <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 21,
                    }}
                    open={saveBtnOpen}
                  >
                   <SyncLoader color={theme.palette.primary.main} />
                  </Backdrop>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default CreatePost;

import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaCommentDots, FaEdit, FaShareSquare } from "react-icons/fa";
import imgPost from "../logo.svg";
import { MdCloudUpload, MdCreate } from "react-icons/md";
import { styled,useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { editPostById, getPostById } from "../store/reducer/postReducer";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { getAllTags } from "../store/reducer/tagsReducer";
import ImageCroper from "./imageCroper";
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

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { tags } = useSelector((state) => state.tag);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [postDetailVal, setPostDetailVal] = useState("");
  const [blogType, setBlogType] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [openLoading, setOpenLoading] = useState(false);
  const [modelOpen,setModelOpen] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  useEffect(() => {
    dispatch(getPostById(id)).then((res) => {
      setPostDetailVal(res.payload);
      setBlogContent(res.payload?.content);
      setBlogType(res.payload?.type);
      setBlogTitle(res.payload?.title);
      setImage(res.payload?.photoURL);
      setLoading(false);
    });
  }, []);

  useEffect(()=>{
    dispatch(getAllTags())
  },[])

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("You are not authenticated");
      navigate("/");
    }
  }, [isAuthenticated]);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImagePreview(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setModelOpen(true)
    }
  };

  const changeImage = (e) => {
    let files = e.target.files[0];
    setImage(files);
    setImagePreview(URL.createObjectURL(files));
  };

  const postBlog = async() => {
    let file = await fetch(uploadedImageUrl).then((res) => res.blob());

    const data = {
      photoURL: file,
      type: blogType,
      title: blogTitle,
      content: blogContent,
      id: id,
    };
    setOpenLoading(true);
    dispatch(editPostById({uploadedImageUrl, id, data ,image})).then((res) => {
      setOpenLoading(false);
      navigate(`/post-details/${id}`);
    });
  };

  const closeDialog =()=>{
    setModelOpen(!modelOpen)
  }

  const handleUpload = (url) => {
    setUploadedImageUrl(url);
    setModelOpen(false)
  };

  return (
    <>
      <Box my={5}>
        { !loading && (       
           <Container maxWidth="md">
          <Card>
            <Stack direction="row" sx={{ p: 1, display: "flex" }}>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  display: "flex",
                  mr: 2,
                }}
                aria-label="recipe"
              >
                <img src={user?.photoURL} alt="creater-view" 
                width="100%"
                
                style={{aspectRatio: '1 / 1',
                objectFit: 'cover'}}
                 />
              </Avatar>
              <Stack sx={{ alignItems: "start" }}>
                <Typography>{postDetailVal?.userDetails?.userName}</Typography>
                <Typography variant="body2">
                {moment(postDetailVal?.createdDate).format("Do MMMM YYYY")}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            {imagePreview?.length !== 0 ? (
              <CardMedia
                component="img"
                width="100%"
                height={285}
                // sx={{aspectRation:'3/1'}}
                image={uploadedImageUrl}
                alt="blog-views"
              />
            ) : (
              <CardMedia
                component="img"
                height={285}
                // sx={{aspectRation:'3/1'}}
                image={image}
                alt="blog-views"
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
              <VisuallyHiddenInput onChange={onSelectFile} type="file" />
            </Button>

            {
              modelOpen && (
                <ImageCroper closeDialogBtn={closeDialog} ImageToCrop = {imagePreview} onUpload={handleUpload}/>
              )}

            <CardContent>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  select
                  value={blogType}
                  placeholder="select blog type"
                  label="Select category"
                  sx={{textAlign:'start',textTransform:'capitalize'}}
                  onChange={(e) => setBlogType(e.target.value)}
                >
                   { !loading && tags.map((tag,i)=>{
                    return (
                      <MenuItem sx={{textAlign:'start'}} value={tag?.tagName} sx={{textTransform:'capitalize'}}>{tag?.tagName}</MenuItem>
                    )
                  })}
                </TextField>
                <TextField
                  fullWidth
                  multiline
                  name="blogTitle"
                  onChange={(e) => setBlogTitle(e.target.value)}
                  value={blogTitle}
                  placeholder="Write your content"
                  label="Title"
                />
                <TextField
                  fullWidth
                  multiline
                  name="blogContent"
                  onChange={(e) => setBlogContent(e.target.value)}
                  value={blogContent}
                  placeholder="Write your content"
                  label="Content"
                />
              </Stack>
            </CardContent>
            <CardActions sx={{ float: "right", p: 2 }}>
              <Button
                variant="contained"
                endIcon={<MdCreate />}
                onClick={postBlog}
              >
                {" "}
                Update
              </Button>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={openLoading}
                onClick={setOpenLoading}
              >
                <SyncLoader color={theme.palette.primary.main} />
              </Backdrop>
            </CardActions>
          </Card>
        </Container>
        )}
        {
          loading && <CircularProgress/>
        }

      </Box>
    </>
  );
};

export default EditPost;

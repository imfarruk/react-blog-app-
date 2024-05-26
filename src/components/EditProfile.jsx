import {
  Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { styled ,useTheme} from "@mui/material/styles";
  import { MdCloudUpload } from "react-icons/md";
  import { uploadProfilePhoto, userDetails } from "../store/reducer/authReducer";
  import { toast } from "react-toastify";
  import noUserPhoto from "../assets/images/No_image_available.svg.webp";
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
  
  const EditProfile = () => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({});
    const [userName, setUserName] = useState(user?.userName || "");
    const [phoneNo, setPhoneNo] = useState(user?.phoneNumber);
    const [userId, setUserId] = useState(user?.uid);
    const [imageFile, setImageFile] = useState(null);
    const [profilePreview, setProfilePreview] = useState("");
    const [fileChange, setFileChange] = useState(false);
    const [saveBtnOpen, setSaveBtnOpen] = useState(false);

    useEffect(() => {
      if (!isAuthenticated && !loading) {
        navigate("/");
      }
      dispatch(userDetails())
    }, [dispatch]);
  
    const updateProfile = () => {
      const data = {
        userName: userName,
        phoneNumber: phoneNo,
        photoURL: imageFile === null ? user?.photoURL : imageFile,
        userId: userId,
        role:user?.role
      };
      setSaveBtnOpen(true);
      // setOpenLoading(true);
      uploadProfilePhoto({imageFile, data})
        .then((datas) => {
          toast.success("user details updated successfully");
          navigate("/profile");
          setSaveBtnOpen(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };
  
    const fileUpload = (e) => {
      setFileChange(true);
      let files = e.target.files[0];
      setImageFile(files);
      setProfilePreview(URL.createObjectURL(files));
    };
    return (
      <Box >
        <Container maxWidth="md">
          <Paper square sx={{ p: 2, my: 5 }} elevation={20}>
            <Box mb={2}>
              <Typography
                variant="h6"
                sx={{ fontFamily: "cursive", textAlign: "center" }}
                mb={1}
              >
                Update your details
              </Typography>
  
              <Divider mb={1} />
            </Box>
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              <Grid item xs={8} sm={4}>
                <Stack sx={{ alignItems: "center" }}>
                  {profilePreview.length !== 0 ? (
                    <img
                      src={profilePreview}
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        width: "200px",
                        aspectRatio: 1 / 1,
                      }}
                      alt="user-profile"
                    />
                  ) : (
                    <img
                      src={user?.photoURL !== null ? user?.photoURL : noUserPhoto}
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        width: "200px",
                        aspectRatio: 1 / 1,
                      }}
                      alt="user-profile"
                    />
                  )}
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    size="small"
                    startIcon={<MdCloudUpload />}
                    sx={{ mt: 1 }}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      type="file"
                      // value={imageFile}
                      onChange={fileUpload}
                    />
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Paper square sx={{ p: 3 }} elevation={20}>
                  <Stack spacing={1.5}>
                    <TextField
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                      size="small"
                      name="user"
                      label="User Name"
                    />
                    <TextField
                      onChange={(e) => setPhoneNo(e.target.value)}
                      type="number"
                      value={phoneNo}
                      size="small"
                      name="phoneNo"
                      label="Phone No"
                    />
                    <TextField
                      size="small"
                      name="email"
                      label="Email"
                      value={user.email}
                      disabled
                    />
                    <Box sx={{ textAlign: "end" }}>
                      <Button variant="contained" onClick={updateProfile}>
                        Update Profile 
                      </Button>
                    </Box>
                    <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 11,
                    }}
                    open={saveBtnOpen}
                  >
                    <SyncLoader color={theme.palette.primary.main} />
                  </Backdrop>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    );
  };
  
  export default EditProfile;
  
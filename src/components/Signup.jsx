import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  MdEmail,
  MdOutlineVisibilityOff,
  MdSend,
  MdVisibility,
} from "react-icons/md";
import { IoPush } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { center } from "../assets/css/muiStyles";
import {  toast } from "react-toastify";

//image import
import googleIcon from "../assets/images/google.png";
import facebookIcon from "../assets/images/facebook.png";

import loginImg from "../assets/images/blog-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { BiLock } from "react-icons/bi";
import { signupUser } from "../store/reducer/authReducer";

const Signup = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, loading, error,isAuthenticated } = useSelector((state) => state.auth);
  const stateee = useSelector((state) => state.appTheme);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveBtnOpen, setSaveBtnOpen] = useState(false);
  const [emailError,setEmailError] = useState('')
  const [passwordError,setPasswordError] = useState('')

  const navigate = useNavigate();

  const validateForm=()=>{
    let errors = {};
    if (!email) {
        errors.email = 'Email Required'
        setEmailError( errors.email);
      }
      if (!password) {
        errors.password = 'Password required'
        setPasswordError(errors.password);
      }else if(password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        setPasswordError(errors.password);
      }
      return Object.keys(errors).length === 0;
 }

  const signupWithEmail = async (e) => {
    e.preventDefault();
   
    if(validateForm()){
        setEmailError("")
        setPasswordError("")
        setSaveBtnOpen(true);
       dispatch(signupUser({ email, password })).then((res) => {
        if(res.payload !== 'auth/email-already-in-use'){
          // toast.info(res.payload);
          navigate('/')
        }
        console.log(res);
        setSaveBtnOpen(false);
      });
    }
  };

  const signInWIthGoogle = () => {

  };




  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };


  return (
    <>
      <Box sx={{ ...center, py: "30px" }}>
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            container
            mx={3}
            item
            xs={12}
            md={8}
            sm={10}
            sx={{
              minHeight: "430px",
              // background: "#fff",
              display: "flex",
              alignSelf: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sm={5}
              sx={{ background: theme.palette.primary.main }}
            >
              <Box
                sx={{
                  height: { sm: "100%", xs: "auto" },
                  color: "#fff",
                  flexDirection: "column",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  margin: 3,
                }}
              >
                <img src={loginImg} alt="login" width="100%" />
                <Box>
                  <Typography sx={{color:'text.primary'}}>
                    if you are already a user then please login from here.
                  </Typography>
                  <Link to="/login">
                    <Button
                      variant="contained"
                      endIcon={<IoPush />}
                      sx={{ mt: 2 }}
                      color="secondary"
                    >
                      Login
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Box
                sx={{ p: 5, border: `1px solid ${theme.palette.primary.main}` }}
              >
                <Box
                  sx={{
                    py: 5,
                    gap: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4" sx={{color:'text.primary'}}>Signup</Typography>
                  <TextField
                    fullWidth
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="outlined-basic2"
                    label="email"
                    variant="outlined"
                    required
                    error={emailError}
                    helperText={emailError && emailError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdEmail />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    name="password"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    id="outlined-basic4"
                    label="password"
                    variant="outlined"
                    required
                    error={passwordError}
                    helperText={passwordError && passwordError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BiLock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <MdOutlineVisibilityOff />
                            ) : (
                              <MdVisibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    endIcon={<MdSend />}
                    onClick={signupWithEmail}
                  >
                    Signup
                  </Button>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={saveBtnOpen}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </Box>
                <Divider />
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{color:'text.primary'}}>------------ or ------------</Typography>

                  <Typography sx={{color:'text.primary'}}>
                    you can also login through third party
                  </Typography>
                  <Box sx={{ p: 3, display: "flex", gap: 2 }}>
                    <Button onClick={signInWIthGoogle}>
                      <img src={googleIcon} alt="google" width="40px" />
                    </Button>
                    <Button>
                      <img src={facebookIcon} alt="google" width="40px" />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Signup;

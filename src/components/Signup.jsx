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
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser, FaPhoneAlt, FaGoogle } from "react-icons/fa";
import { IoPush } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { center } from "../assets/css/muiStyles";
import { ToastContainer, toast } from "react-toastify";
// import { homeCenter, center,centerBox } from "../constant/style";
// firebase
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { app } from "../firebase/firebase";

// redux
// import { LOGIN } from "../store/actions/index";

//image import
import googleIcon from "../assets/images/google.png";
import facebookIcon from "../assets/images/facebook.png";

import loginImg from "../assets/images/blog-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { BiLock } from "react-icons/bi";
import { signupUser } from "../store/reducer/authReducer";
// import { saveResultTodb } from "../store/actions/createQuiz";
// import { gitHubLogin } from "../store/actions/authAction";

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

const Signup = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, loading, error,isAuthenticated } = useSelector((state) => state.auth);
  console.log(user,loading,error,'error',isAuthenticated);
  //   const alreadyAuth = useSelector((state) => state.auth);
  //   const { isAuthenticated, loading } = alreadyAuth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveBtnOpen, setSaveBtnOpen] = useState(false);
  const [emailError,setEmailError] = useState('')
  const [passwordError,setPasswordError] = useState('')

  const navigate = useNavigate();

  useEffect(()=>{
    isAuthenticated && navigate('/')
  })

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
    //  dispatch(signupUser({email,password})).then((res)=>{
    //     console.log(res.payload,'resVal-inside');
    //     toast.success(res);
    //     setEmail("");
    //     setPassword("")
    // }).catch((error)=>{
    //     console.log(error);
    //     toast.error(error);

    // })
    if(validateForm()){
        setEmailError("")
        setPasswordError("")
        setSaveBtnOpen(true);
       dispatch(signupUser({ email, password })).then((res) => {
        toast.info(res.payload);
        setSaveBtnOpen(false);
      });
    }
    //   console.log(res, "resVal-inside");
    //   toast.success(res.payload.email);
  
    // console.log(resVal,'resVal-inside');
  };

  const signInWIthGoogle = () => {
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     GoogleAuthProvider.credentialFromResult(result);
    //     const users = {
    //       token: result.user.accessToken,
    //       displayName: result.user.displayName,
    //       email: result.user.email,
    //       phoneNumber: result.user.phoneNumber,
    //       photoURL: result.user.photoURL,
    //       uid: result.user.uid,
    //     };
    //     dispatch({
    //       type: LOGIN,
    //       payload: users,
    //     });
    //     toast.success("login success");
    //     navigate("/");
    //     // ...
    //   })
    //   .catch((error) => {
    //     toast.error(error.code);
    //   });
  };

  useEffect(() => {
    // if (isAuthenticated && !loading) {
    //   navigate("/");
    // }
  }, []);

  //   useEffect(()=>{
  // if(isAuthenticated){
  //     saveResultTodb().then((res)=>{
  //         toast.success(res)
  //     })
  // }

  //   },[isAuthenticated])

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const userGithubSignIn = () => {
    // dispatch(gitHubLogin()).then((res)=>
    // console.log(res,'resss')
    //   )
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
              background: "#fff",
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
                  <Typography>
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
                  <Typography variant="h4">Signup</Typography>
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
                  <Typography>------------ or ------------</Typography>

                  <Typography>
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

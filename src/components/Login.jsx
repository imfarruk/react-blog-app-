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
import { toast } from "react-toastify";
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
import { loginUser } from "../store/reducer/authReducer";
import { LoadingButton } from "@mui/lab";
import { GrSave } from "react-icons/gr";
import { SyncLoader } from "react-spinners";
// import { saveResultTodb } from "../store/actions/createQuiz";
// import { gitHubLogin } from "../store/actions/authAction";

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

const Login = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  //   const { isAuthenticated, loading } = alreadyAuth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveBtnOpen, setSaveBtnOpen] = useState(false);
  const [emailError,setEmailError] = useState('')
  const [passwordError,setPasswordError] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate("/");
  });

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

  const signInWithEmail = (e) => {
    e.preventDefault();
    
    
    if(validateForm()){
        setEmailError("")
        setPasswordError("")
        setSaveBtnOpen(true);
        dispatch(loginUser({ email, password })).then((res) => {
          if(!res.payload){
            toast.info(res.payload);
          }
           
            setSaveBtnOpen(false);
          });
    }
    
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const users = {
    //       token: userCredential.user.accessToken,
    //       displayName: userCredential.user.displayName,
    //       email: userCredential.user.email,
    //       phoneNumber: userCredential.user.phoneNumber,
    //       photoURL: userCredential.user.photoURL,
    //       uid: userCredential.user.uid,
    //     };
    //     toast.success("user login");
    //     setEmail("");
    //     setPassword("");
    //     dispatch({
    //       type: LOGIN,
    //       payload: users,
    //     });
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     toast.error(error.code);
    //   });
  };

  const userSignInWIthGoogle = () => {
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
            sm={10}
            md={8}
            sx={{
              minHeight: "450px",
              // background: "#fff",
              display: "flex",
              alignSelf: "center",
              border: `1px solid ${theme.palette.primary.main}`,
            }}
          >
            <Grid item xs={12} sm={7} order={{ xs: 2, sm: 1 }}>
              <Box sx={{ p: 5 }}>
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
                  <Typography variant="h4" sx={{color:'text.primary'}}>Login</Typography>
                  <TextField
                    name="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="outlined-basic1"
                    label="email"
                    variant="outlined"
                    required
                    error={Boolean(emailError)}
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
                    name="password"
                    fullWidth
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    id="outlined-basic"
                    label="password"
                    variant="outlined"
                    required
                    autoComplete="off"
                    error={Boolean(passwordError)}
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
                    onClick={signInWithEmail}
                    variant="contained"
                    endIcon={<MdSend />}
                  >
                    Login
                  </Button>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={saveBtnOpen}
                  >
                   <SyncLoader color={theme.palette.primary.main} />
                  </Backdrop>
                </Box>
                <Divider />
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{color:'text.primary'}}>------------ or ------------</Typography>
                  <Typography sx={{color:'text.primary'}}>
                    you can also login through third party
                  </Typography>
                  <Box sx={{ p: 3, display: "flex", gap: 2 }}>
                    <Button onClick={userSignInWIthGoogle}>
                      <img src={googleIcon} alt="google" width="40px" />
                    </Button>
                    <Button onClick={userGithubSignIn}>
                      <img src={facebookIcon} alt="google" width="40px" />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={5}
              sx={{ background: theme.palette.primary.main }}
              order={{ xs: 1, sm: 2 }}
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
                    if you are a new user then please signup from here.
                  </Typography>
                  <Link to="/signup">
                    <Button
                      variant="contained"
                      endIcon={<IoPush />}
                      sx={{ mt: 2 }}
                      color="secondary"
                    >
                      Signup
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Login;

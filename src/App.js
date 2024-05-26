import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// importing components
import Header from "./components/Header";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import darkTheme from "./Theme/darkTheme";
import lightTheme from "./Theme/lightTheme";
import { Box } from "@mui/material";
import { themeMode } from "./store/reducer/themeReducer";
import { loadUser, userDetails } from "./store/reducer/authReducer";
// import { PersistGate } from 'redux-persist/integration/react'
import { store } from "./store/store";

function App() {
  // const dispatch = useDispatch();
  // const selector = useSelector((state) => state.appTheme);
  const [darkMode, setDarkMode] = useState("light");

  useEffect(() => {
    store.dispatch(loadUser());
    // store.dispatch(userDetails());
  }, []);
  const theme = darkMode === "dark" ? darkTheme : lightTheme;

  const themeChange = (e) => {
    const newMode = darkMode === "light" ? "dark" : "light";
    setDarkMode(newMode);
    // localStorage.setItem("portfolioMode", newMode);
  };

  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Box
        className="App"
        sx={{
          background: theme.palette.background.default,
          paddingBottom: 2,
          minHeight: "100vh",
        }}
      >
        {/* <PersistGate loading={null} persistor={Persistor}> */}

        {/* <ThemeProvider theme={theme}> */}

        <Header check={darkMode} change={(e) => themeChange()} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/post-details/:id" element={<PostDetails />} />
          <Route exact path="/create-post" element={<CreatePost />} />
          <Route exact path="/edit-post/:id" element={<EditPost />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/edit-profile" element={<EditProfile />} />
        </Routes>
        <ToastContainer />
      </Box>
      {/* </ThemeProvider> */}
      {/* </PersistGate> */}
    </ThemeProvider>
     </Provider>
  );
}

export default App;

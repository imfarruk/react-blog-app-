import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../store/reducer/authReducer";

import noUserPhoto from "../assets/images/No_image_available.svg.webp";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [savedQuizResult, setSavedQuizResult] = useState();

  useEffect(() => {
    !isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(userDetails());
  }, [dispatch]);

  const editProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <Box>
      {!loading && (
        <Container maxWidth="md">
          <Paper maxWidth="md" sx={{ p: 2, my: 5 }} elevation={20} square>
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              <Grid item xs={8} sm={4}>
                <Stack sx={{ alignItems: "center", textAlign: "center" }}>
                  {user?.photoURL === null ? (
                    <img
                      src={noUserPhoto}
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        width: "200px",
                        aspectRatio: 1 / 1,
                        p: 1,
                      }}
                      alt="profile"
                    />
                  ) : (
                    <img
                      src={user?.photoURL}
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        width: "200px",
                        aspectRatio: 1 / 1,
                        p: 1,
                      }}
                      alt="profile"
                    />
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sm={8}>
                {/* <Paper square elevation={20} sx={{ width: "100%", height: "100%" }}> */}
                <Stack sx={{ p: 2 }}>
                  <Typography
                    sx={{
                      fontSize: 26,
                      fontFamily: "poetsen one",
                      color: "text",
                    }}
                  >
                    {" "}
                    Welcome,
                    <br /> Mr {user?.userName}
                  </Typography>
                  <Divider />
                  <Typography
                    variant="h6"
                    mt={1}
                    sx={{ color: "text.primary" }}
                  >
                    You can check your progress.
                  </Typography>
                  <Typography variant="h6" sx={{ color: "text.primary" }}>
                    Also you can update your profile.
                  </Typography>
                </Stack>
                {/* </Paper> */}
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Paper
                square
                elevation={20}
                sx={{ width: "100%", height: "100%" }}
              >
                <Stack sx={{ p: 2 }}>
                  <Typography
                    sx={{
                      fontSize: { sm: 24, xs: 20 },
                      fontFamily: "cursive",
                    }}
                  >
                    Your Personal Information
                  </Typography>
                  <Divider />
                  <Typography variant="h6" mt={1}>
                    Email: {user?.email}
                  </Typography>
                  <Typography variant="h6">
                    Phone No: {user?.phoneNumber}
                  </Typography>
                  {savedQuizResult?.role === "admin" && (
                    <Typography
                      variant="h6"
                      sx={{ textTransform: "capitalize" }}
                    >
                      Role: {savedQuizResult?.role}
                    </Typography>
                  )}
                  <Box sx={{ textAlign: "end" }}>
                    <Button variant="contained" onClick={editProfile}>
                      Edit Profile
                    </Button>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
            {/* <Grid container spacing={2} mt={0.4}>
          {!loadingReduce && (savedQuizResult?.userResult).length !== 0 && (
            <>
              <Grid item xs={12} md={6}>
                <Paper square elevation={20} sx={{ height: "100%" }}>
                  <Stack sx={{ p: 2 }}>
                    <Typography sx={{ fontSize: 18 }}>
                      Your last quiz Result
                    </Typography>
                    <Divider />
                    <Stack mt={1}>
                      <Typography>
                        Attempted Subject :{" "}
                        {savedQuizResult?.userResult[0]?.subject}
                      </Typography>
                      <Typography>
                        Subject Level :{" "}
                        {savedQuizResult?.userResult[0]?.level}
                      </Typography>
                      <Typography>
                        Total Attempt :{" "}
                        {savedQuizResult?.userResult[0]?.totalAttempt}
                      </Typography>
                      <Typography>
                        Correct Answer :{" "}
                        {savedQuizResult?.userResult[0]?.correctAnswer}
                      </Typography>
                      <Typography>
                        Wrong Answer :{" "}
                        {savedQuizResult?.userResult[0]?.wrongAnswer}
                      </Typography>
                      <Typography>
                        Marks Percentage :{" "}
                        {savedQuizResult?.userResult[0]?.markPercentage} %
                      </Typography>
                      <Typography>Date : {quizDate}</Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper square sx={{ height: "100%" }} elevation={20}>
                  <Stack sx={{ p: 2 }}>
                    <Typography sx={{ fontSize: 18 }}>
                      Your all quiz results
                    </Typography>
                    <Divider />
                    <Stack mt={1}>
                      <Typography>
                        Total Attempt : {allSavedResult?.totalAttempt}
                      </Typography>
                      <Typography>
                        Correct Answer : {allSavedResult?.correctAnswer}
                      </Typography>
                      <Typography>
                        Wrong Answer : {allSavedResult?.wrongAnswer}
                      </Typography>
                      <Typography>
                        Marks Percentage :{" "}
                        {Math.floor((`${allSavedResult?.correctAnswer}` /
                          `${allSavedResult?.totalAttempt}`) *
                          100)}{" "}
                        %
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            </>
          )}

          {!loadingReduce && (savedQuizResult?.userResult).length === 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 2, mt: 1 }} elevation={20}>
                <Typography sx={{ fontSize: 18 }}>
                  Your quiz result
                </Typography>
                <Divider />
                <Typography>Data is not available</Typography>
                <Typography>
                  Do more exercises and save your result
                </Typography>
              </Paper>
            </Grid>
          )}

          {loadingReduce && (
            <Grid item xs={12}>
              <Paper sx={{ p: 2, mt: 1 }} elevation={20}>
                <Typography sx={{ fontSize: 18, mt: 2 }}>
                  Loading ...
                </Typography>
                <LinearProgress sx={{ mt: 2, mb: 1 }} />
              </Paper>
            </Grid>
          )}
        </Grid> */}
          </Paper>
        </Container>
      )}
    </Box>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import Search from "./Search";
import {
  Box,
  Grid,
  Divider,
  Typography,
  CircularProgress,
  Stack,
  Pagination,
  Button,
} from "@mui/material";
import Sidebar from "./Sidebar";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreData, getAllPost, resetPosts } from "../store/reducer/postReducer";
import { MdExpandMore } from "react-icons/md";
import { getAllComment } from "../store/reducer/allCommentReducer";
import { getAllLikeComment } from "../store/reducer/commentReducer";
import { SyncLoader } from "react-spinners";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { loading, posts } = useSelector((state) => state.post);
  const {  totalComments } = useSelector((state) => state.comments);
  const {  totalLiked } = useSelector((state) => state.likes);
  const { user } = useSelector((state) => state.auth);
  const [pageNo, setPageNo] = useState(1);

  const pageLimit = 10;

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  // useEffect(()=>{
  //   posts.map(async(post)=>{
  //    await dispatch(getAllComment(post?.id));
  //    await dispatch(getAllLikeComment(post?.id))
  //   })
    
  // },[posts])


  const loadMorePost = () => {
    dispatch(fetchMoreData());
  };
  return (
    <>
      <Search />
      <Box sx={{ m: 2 }}>
        <Typography variant="h5" sx={{color:'text.primary'}}>
          Hello,Welcome to your blog{" "}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Sidebar />
            <Divider sx={{ display: { xs: "flex", sm: "none" } }} />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Grid spacing={3} container>
              {!loading &&
                posts?.length !== 0 &&
                posts.map((post, i) => {
                  return (
                    <Grid
                      key={i}
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Post post={post} />
                    </Grid>
                  );
                })}
                
              {loading && (
                <Stack
                  item
                  xs={12}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt:10,
                  }}
                >
                  <SyncLoader color={theme.palette.primary.main} />
                </Stack>
              )}
              {!loading && posts?.length === 0 && (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{colo:'text.primary'}}>No blogs found</Typography>
                </Grid>
              )}
              
            </Grid>
            {/* {!loading && posts?.length !== 0 && (
                <Stack spacing={2} mt={3} sx={{justifyContent:'center'}}>
                  <Button onClick={loadMorePost} endIcon={<MdExpandMore/>}>Load More </Button>
                </Stack>
              )} */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;

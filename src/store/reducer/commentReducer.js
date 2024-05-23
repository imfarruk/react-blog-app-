import { createSlice } from "@reduxjs/toolkit";
// import { loginUser, signupUser } from '../apiSlice/authApi';

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase/firebase";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const auth = getAuth(app);
const firestore = getFirestore(app);
const blogComment = "blog-comments";
const blogPostDB = "blog-post";

const initialState = {
  loading: true,
  error: null,
  // likes: [],
  likedUser: 0,
  totalLiked: 0,
};

export const commentSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLikeComment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLikeComment.fulfilled, (state, action) => {
        state.likedUser = action.payload?.likedUser;
        state.totalLiked = action.payload?.totalLiked;
      })

      .addCase(likePost.fulfilled, (state, action) => {
        state.likedUser = action.payload?.likedUser;
        state.totalLiked = action.payload?.totalLiked;
        state.loading = false;
        //   state.posts = action.payload;
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        state.likedUser = action.payload?.likedUser;
        state.totalLiked = action.payload?.totalLiked;
        state.loading = false;
      });
  },
});

export const { incrementByAmount } = commentSlice.actions;

export default commentSlice.reducer;

export const getAllLikeComment = createAsyncThunk(
  "getPostLikes1",
  async (id) => {
    try {
      let resArray = [];
      let filterData = [];
      const querySnapshot = await getDocs(
        collection(firestore, `${blogPostDB}/${id}/likedUser`)
      );
      querySnapshot.forEach((doc) => {
        resArray.push(doc.data());
        return resArray;
      });

      if (auth.currentUser !== null) {
        filterData = resArray.filter((res) => {
          if (res?.likedUser === auth.currentUser.uid) {
            return res;
          }
        });
      }
      const totalLikes = resArray.filter((res) => {
        if (res?.like !== 0) {
          return res;
        }
      });
      const value = {
        likedUser: filterData[0]?.like || 0,
        totalLiked: totalLikes?.length,
      };
      return value;
    } catch (error) {
      console.log(error.code);
    }
  }
);

export const likePost = createAsyncThunk("likePost", async ({ id, userId }) => {
  try {
    const docRef = await addDoc(
      collection(firestore, `${blogPostDB}/${id}/likedUser`),
      {
        like: 1,
        likedUser: auth.currentUser.uid,
        createdBy: userId,
      }
    );
  } catch (error) {
    console.log(error.code);
  }
});

export const dislikePost = createAsyncThunk(
  "dislikePost",
  async ({ id, userId }) => {
    try {
      const q = query(
        collection(firestore, `${blogPostDB}`, `${id}`, `likedUser`),
        where("likedUser", "==", auth.currentUser.uid)
      );
      const docSnap = await getDocs(q);
      let docId;
      docSnap.forEach((doc) => {
        docId = doc.id;
      });
      await deleteDoc(doc(firestore, `${blogPostDB}/${id}/likedUser`, docId));
      toast.success("dislike post");
    } catch (error) {
      console.log(error.code);
    }
  }
);

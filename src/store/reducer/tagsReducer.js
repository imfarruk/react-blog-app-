import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
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
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const auth = getAuth(app);
const firestore = getFirestore(app);
const blogTags = "blog-tags";

const initialState = {
  loading: true,
  error: null,
  totalTags: 0,
  tags: [],
};

export const tagSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTags.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.tags = action.payload;
        state.totalTags = action.payload?.length;
        state.loading = false;
      });
  },
});

export const {} = tagSlice.actions;

export default tagSlice.reducer;

export const getAllTags = createAsyncThunk("getAllTags", async (id) => {
  try {
    let userDetails = [];
    let resArray = [];

    const tagRef = collection(firestore, `${blogTags}`);
    const querySnapshot = await getDocs(tagRef);
    querySnapshot.forEach((doc) => {
      resArray.push({ ...doc.data(), id: doc.id });
      return resArray;
    });

    return resArray;
  } catch (error) {
    console.log(error);
  }
});

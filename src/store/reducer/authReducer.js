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

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const initialState = {
  token: localStorage.getItem("blogToken") || null,
  isAuthenticated: !!localStorage.getItem("blogToken"),
  loading: true,
  role: "",
  error: null,
  user: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hasError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = action.payload.token.length !==0 ? true : false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { hasError, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;

// action

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("blogToken", JSON.stringify(token));
      const users = {
        token: token,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        phoneNumber: userCredential.user.phoneNumber,
        photoURL: userCredential.user.photoURL,
        uid: userCredential.user.uid,
      };
      console.log(users,'user');
      toast.success('Login successful');
      return users;
    } catch (error) {
        toast.error(error.code);
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const token = await user.getIdToken();
      localStorage.setItem("blogToken", JSON.stringify(token));

      const users = {
        token: token,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: user.uid,
      };
      toast.success(res.user);
      console.log(users,res,'res')
      return users;
    } catch (error) {
      toast.error(error.code);
      console.log(error.code)
      return error.code;
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      localStorage.removeItem("blogToken");
      toast.success('Logout successful')
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
// import { loginUser, signupUser } from '../apiSlice/authApi';

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase/firebase";
import { toast } from "react-toastify";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage();
const firestore = getFirestore(app);
const blogUsers = "blog-user";
const usersPicture = "user-picture";

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
        console.log(action.payload, "payload");
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = action.payload.token ? true : false;
        state.token = action.payload.token;
        // state.isAuthenticated =  action.payload !== 'auth/email-already-in-use' ? true : false;
        // state.token = action.payload !== 'auth/email-already-in-use' && action.payload.token;
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
        state.isAuthenticated =
          action.payload.token.length !== 0 ? true : false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        // state.user = action.payload;
        if(action.payload !== null){
          state.loading = false;
          state.isAuthenticated =
            action.payload.accessToken.length !== 0 ? true : false;
            state.token = action.payload.accessToken;
          state.user = action.payload;
        }
      })
      .addCase(loadUser.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userDetails.pending, (state, action) => {
        state.loading = false;
        state.error = null;
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
      toast.success("Login successful");
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
      if (!res) {
        return false;
      }
      const user = res.user;
      const token = await user.getIdToken();
      localStorage.setItem("blogToken", JSON.stringify(token));

      const users = {
        userName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        role: "user",
        uid: user.uid,
        token: token,
      };
      const docRef = doc(firestore, blogUsers, users.uid);
      await setDoc(docRef, users, { merge: true });

      toast.success("Signup successful");
      return users;
    } catch (error) {
      toast.error(error.code);
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      localStorage.removeItem("blogToken");
      toast.success("Logout successful");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Load User
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try{
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }catch(error){
    return thunkAPI.rejectWithValue(error.message);
  }
  }
);

export const userDetails = createAsyncThunk("userDetails", async () => {
  try {
    const docRef = doc(firestore, blogUsers, auth.currentUser.uid);
    const result = await getDoc(docRef);
    const value = result.data();
    return value;
  } catch (error) {
    console.log(error.code);
  }
});

export const uploadProfilePhoto = async ({ imageFile, data }) => {
  // console.log(file,data,'data');
  let downloadURLs = null;
  let dates = Date.now();
  console.log(imageFile,data,'data');
  try {
    if (imageFile !== null) {
      const storageRef = ref(
        storage,
        `${usersPicture}/${auth.currentUser.uid}`
      );
      await uploadBytes(storageRef, data.photoURL);
      downloadURLs = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, {
        photoURL: downloadURLs,
        displayName: data.userName,
      });
      const docRef = doc(firestore, blogUsers, auth.currentUser.uid);

      const updateRes = await setDoc(
        docRef,
        {
          userName: data.userName,
          photoURL: downloadURLs,
          role: data.role,
          phoneNumber: data.phoneNumber,
          // lastUpdate: dates,
          email: auth.currentUser.email,
        },
        { merge: true }
      );
      return updateRes;
    }else{
      const docRef = doc(firestore, blogUsers, auth.currentUser.uid);

      const updateRes = await setDoc(
        docRef,
        {
          userName: data.userName,
          role: data.role,
          phoneNumber: data.phoneNumber,
          // lastUpdate: dates,
          email: auth.currentUser.email,
        },
        { merge: true }
      );
      return updateRes;
    }
   
  } catch (error) {
    console.log(error);
  }
};

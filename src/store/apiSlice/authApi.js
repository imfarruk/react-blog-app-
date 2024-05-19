import { creatApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebase/firebase";
import { toast } from "react-toastify";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    console.log(email, password, "authhhh");
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //     // Signed in
          const users = {
            token: userCredential.user.accessToken,
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            phoneNumber: userCredential.user.phoneNumber,
            photoURL: userCredential.user.photoURL,
            uid: userCredential.user.uid,
          };
          console.log(users);
          // toast.success("user login");
          // setEmail("");
          // setPassword("");
          // dispatch({
          //   type: LOGIN,
          //   payload: users,
          // });
          // navigate("/");
        })
        .catch((error) => {
          // toast.error(error.code);
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, thunkAPI) => {
    try {
      console.log(email, password);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      //   console.log(res.user,'resssssss');
      toast.success(res.user);
      return {
        uid: user.uid,
        email: user.email,
      };
    } catch (error) {
      toast.success(error.code);
      return error.code;
    }
  }
);

// export const signupUser = async({ email, password }) => {
// //   return async () => {
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       toast.success(res.user);
//       return res.user;
//     } catch (error) {
//       console.log(error.code);
//       toast.error(error.code);
//       return error.code;
//     }
// //   };
// };

// export const authApi = createApi({
//     reducerPath:'auth',
//     baseQuery:fetchBaseQuery({})
// })

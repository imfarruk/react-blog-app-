import { createSlice } from "@reduxjs/toolkit";
// import { loginUser, signupUser } from '../apiSlice/authApi';

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
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
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import moment from "moment";

const auth = getAuth(app);
const firestore = getFirestore(app);
const blogComment = "blog-comments";
const blogPostDB = "blog-post";
const blogUsers= "blog-user"

const initialState = {
  loading: true,
  error: null,
  totalComments: 0,
  comments: [],
};

export const commentSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllComment.pending, (state, action) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllComment.fulfilled, (state, action) => {
          
          state.comments = action.payload;
          state.totalComments=action.payload?.length;
          state.loading = false;
        })
        .addCase(deleteTheComment.pending, (state, action) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteTheComment.fulfilled, (state, action) => {
           
            // state.comments = action.payload;
            // state.totalComments=action.payload?.length;
            state.loading = false;
          })
       
    },
  });

  export const { incrementByAmount } = commentSlice.actions;

export default commentSlice.reducer;


export const getAllComment = createAsyncThunk(
    "getAllComments",
    async (id) => {
     
      try {
        let resArray = [];
        const q = query(collection(firestore, `${blogPostDB}/${id}/userComments`),orderBy("createdDate",'asc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          resArray.push({...doc.data(),id:doc.id});
          return resArray;
        });
        return resArray;
      } catch (error) {
        console.log(error.code);
      }
    }
  );
  
  
  export const doCommentOnPost = createAsyncThunk("commentOnPost", async ({ id, message }) => {
    try {
      const docRef2 =  doc(firestore, blogUsers, auth.currentUser.uid);
         const result2 = await getDoc(docRef2);
         const userDetails = result2.data();
      const docRef = await addDoc(
        collection(firestore, `${blogPostDB}/${id}/userComments`),
        {
          message: message,
          userName: userDetails.userName,
          photoURL: userDetails.photoURL,
          userEmail: auth.currentUser.email,
          userId: auth.currentUser.uid,
          createdDate: Date.now(),
        }
      );
    } catch (error) {
      console.log(error.code);
    }
  });

  export const deleteTheComment = createAsyncThunk("deleteComment",async(datas)=>{
   
    try{
      
        const commentRef  = doc(firestore, `${blogPostDB}/${datas.id}/userComments`, datas.commentId);
         await deleteDoc(commentRef);
        
          return 
    }catch(error){
        console.log(error.code);
    }
  })



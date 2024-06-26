import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "../../firebase/firebase";
import { nanoid } from 'nanoid'
import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAllLikeComment } from "./commentReducer";

//add data firestore
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage();

const blogPostDB = "blog-post";
const blogPictureDB = "blog-picture";
const blogUsers = "blog-user";
const initialState = {
  loading: true,
  error: null,
  posts: [],
};

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(postViewByTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postViewByTags.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(SearchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SearchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchMoreData.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getMyBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
  },
});

export const createPost = createAsyncThunk(
  "createPost",
  async (value, thunkAPI) => {
    try {
      let downloadURLs = null;
      // if (value.image.length !== 0) {
      
        const storageRef = ref(
          storage,
          `${blogPictureDB}/${auth.currentUser.uid}-${nanoid()}`
        );
        await uploadBytes(storageRef, value.image);
        downloadURLs = await getDownloadURL(storageRef);
      // }

      const docRef = await addDoc(collection(firestore, blogPostDB), {
        userId: auth.currentUser.uid,
        photoURL: downloadURLs,
        title: value.blogTitle,
        type: value.blogType,
        content: value.blogContent,
        createdDate: Date.now(),
        lastUpdate: Date.now(),
      });
      return docRef;
    } catch (error) {
      console.log(error.code);
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const getAllPost = createAsyncThunk(
  "getAllPost",
  async (_, thunkAPI) => {
    let resArray1 = [];
    try {
      const q = query(
        collection(firestore, blogPostDB),
        orderBy("createdDate", "desc")
      );
      const docSnap = await getDocs(q);

      for (const postDoc of docSnap.docs) {
        const postId = postDoc.id;
        const post = postDoc.data();

        // comments
        const q = query(
          collection(firestore, `${blogPostDB}/${postId}/userComments`)
        );
        const querySnapshot = await getDocs(q);
        const totalComments = querySnapshot.size;

    //  total likes
        const likesSnapshot = await getDocs(
          collection(firestore, `${blogPostDB}/${postId}/likedUser`)
        );
        const totalLikes=likesSnapshot.size;
        let likedUserId
        likesSnapshot.forEach((doc) => {
          likedUserId = doc.data().likedUser
        });
        resArray1.push({
          ...post,
          id: postId,
          totalComments,
          totalLikes,
          likedUserId
        });
      }

      return resArray1;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPostLikes = async (id) => {
  let resArray = [];
  let filterData = [];
  const q = query(collection(firestore, blogPostDB, id, "likedUser"));
  const querySnapshot2 = await getDocs(q);
  querySnapshot2.forEach((doc) => {
    resArray.push(doc.data());
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
};

export const getPostById = createAsyncThunk(
  "getPostById",
  async (id, thunkAPI) => {
    try {
      let resArray = [];
      const docRef = doc(firestore, blogPostDB, id);
      const result = await getDoc(docRef);

      const val = {
        ...result.data(),
      };

      const userId = val?.userId;
      const docRef2 = doc(firestore, blogUsers, userId);
      const result2 = await getDoc(docRef2);
      const userDetails = result2.data();

      const values = {
        id: result.id,
        ...result.data(),
        userDetails,
      };
      return values;
    } catch (error) {
      console.log(error.code);
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const editPostById = createAsyncThunk(
  "editPostById",
  async ({uploadedImageUrl, id, data ,image}, thunkAPI) => {
console.log(image,'data');
    let downloadURLs = null;
    let dates = Date.now();
    try {
      if (uploadedImageUrl !== null) {
        const storageRef = ref(
          storage,
          `${blogPictureDB}/${auth.currentUser.uid}-${id}`
        );
        await uploadBytes(storageRef, data.photoURL);
        downloadURLs = await getDownloadURL(storageRef);
        const docRef = doc(firestore, blogPostDB, id);
        const updateRes = await updateDoc(docRef, {
          title: data.title,
          photoURL: downloadURLs,
          type: data.type,
          content: data.content,
          lastUpdate: dates,
        });
        return updateRes;
      }else{
        const docRef = doc(firestore, blogPostDB, id);
        const updateRes = await updateDoc(docRef, {
          title: data.title,
          type: data.type,
          content: data.content,
          lastUpdate: dates,
        });
        return updateRes;
      }
      
      // return updateRes;
    } catch (error) {
      console.log(error.code);
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const postViewByTags = createAsyncThunk(
  "postViewByTags",
  async (tagId, thunkAPI) => {
    try {
      let resArray1 = [];
      let likeArray = [];
      const docRef = query(
        collection(firestore, blogPostDB),
        where("type", "==", tagId),
        orderBy("createdDate", "desc")
      );
      const result = await getDocs(docRef);

      for (const postDoc of result.docs) {
        const postId = postDoc.id;
        const post = postDoc.data();

        // comments
        const q = query(
          collection(firestore, `${blogPostDB}/${postId}/userComments`)
        );
        const querySnapshot = await getDocs(q);
        const totalComments = querySnapshot.size;

        // total likes
        // const likesRef = collection(
        //   firestore,
        //   `${blogPostDB}/${postId}/likedUser`
        // );
        const likesSnapshot = await getDocs(
          collection(firestore, `${blogPostDB}/${postId}/likedUser`)
        );
      
        likesSnapshot.forEach((doc) => {
          likeArray.push(doc.data());
        });
        const totalLikes=likesSnapshot.size;
        let likedUserId
        likesSnapshot.forEach((doc) => {
          likedUserId = doc.data().likedUser
        });

        resArray1.push({
          ...post,
          id: postId,
          totalComments,
          totalLikes,
          likedUserId
        });
        // console.log(resArray1,'resArray',totalLikes,totalComments);
      }

      return resArray1;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const SearchPost = createAsyncThunk(
  "searchPost",
  async (searchVal, thunkAPI) => {
    console.log(searchVal,'searchVal');
    try {
      let resArray = [];
      const docRef = query(
        collection(firestore, blogPostDB),
        where("type", "in", searchVal),
        orderBy("createdDate", "desc")
      );
      const result = await getDocs(docRef);
      for (const postDoc of result.docs) {
        const postId = postDoc.id;
        const post = postDoc.data();

        // comments
        const q = query(
          collection(firestore, `${blogPostDB}/${postId}/userComments`)
        );
        const querySnapshot = await getDocs(q);
        const totalComments = querySnapshot.size;

    //  total likes
        const likesSnapshot = await getDocs(
          collection(firestore, `${blogPostDB}/${postId}/likedUser`)
        );
        const totalLikes=likesSnapshot.size;
        let likedUserId
        likesSnapshot.forEach((doc) => {
          likedUserId = doc.data().likedUser
        });
        resArray.push({
          ...post,
          id: postId,
          totalComments,
          totalLikes,
          likedUserId
        });
      }

      return resArray;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const fetchMoreData = createAsyncThunk(
  "fetchMoreData",
  async (_, thunkAPI) => {
    try {
      let resArray = [];

      const q = query(
        collection(firestore, blogPostDB),
        orderBy("createdDate", "desc"),
        limit(4)
      );
      const docSnap = await getDocs(q);
      docSnap.forEach((doc) => {
        resArray.push({ ...doc.data(), id: doc.id });
      });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const getMyBlogs = createAsyncThunk(
  "allMyBlogs",
  async (userId, thunkAPI) => {
    try {
      let resArray = [];
      const docRef = query(
        collection(firestore, blogPostDB),
        where("userId", "==", auth?.currentUser?.uid),
        orderBy("createdDate", "desc")
      );
      const result = await getDocs(docRef);
      for (const postDoc of result.docs) {
        const postId = postDoc.id;
        const post = postDoc.data();

        // comments
        const q = query(
          collection(firestore, `${blogPostDB}/${postId}/userComments`)
        );
        const querySnapshot = await getDocs(q);
        const totalComments = querySnapshot.size;

    //  total likes
        const likesSnapshot = await getDocs(
          collection(firestore, `${blogPostDB}/${postId}/likedUser`)
        );
        const totalLikes=likesSnapshot.size;
        let likedUserId
        likesSnapshot.forEach((doc) => {
          likedUserId = doc.data().likedUser
        });
        resArray.push({
          ...post,
          id: postId,
          totalComments,
          totalLikes,
          likedUserId
        });
      }

      return resArray;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;

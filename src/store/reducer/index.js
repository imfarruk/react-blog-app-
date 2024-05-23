import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import allCommentReducer from "./allCommentReducer";
import tagsReducer from "./tagsReducer";

const reducer = combineReducers({
    auth: authReducer,
    // appTheme:themeReducer,
    post:postReducer,
    likes:commentReducer,
    comments:allCommentReducer,
    tag:tagsReducer,
})

export default reducer;
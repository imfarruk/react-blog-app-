import { createSlice } from "@reduxjs/toolkit";
import lightTheme from "../../Theme/lightTheme";

const initialState = {
    theme:lightTheme.palette.mode,
       ...lightTheme
  };

export const themeSlice = createSlice({

    name:'theme',
    initialState, 
    reducers:{
       backgroundStyle:(state,action)=>{
        // console.log(initialState,'initial',action.payload);
        state.palette.background.default = action.payload
        // state.palette.background.paper = action.payload
       },
       textStyle:(state,action)=>{
        console.log(initialState,'initial',action.payload);
        state.palette.text.primary = action.payload
       },
       navbarStyle:(state,action)=>{
        // console.log(initialState,'initial',action.payload);
        state.palette.primary.main = action.payload
       },
       buttonStyle:(state,action)=>{
        // console.log(initialState,'initial',action.payload);
          
       },
       themeMode: (state,action)=>{
        // console.log(initialState,'initial',action.payload);
        state.theme = action.payload
       },
       cardStyle: (state,action)=>{
        // console.log(initialState,'initial',action.payload);
        state.palette.background.paper = action.payload
       },
     
    },
})

export const { backgroundStyle,textStyle,navbarStyle ,buttonStyle,themeMode,cardStyle} = themeSlice.actions;

export default themeSlice.reducer;
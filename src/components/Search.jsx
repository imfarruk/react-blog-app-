import React, { useState } from "react";
import Box from "@mui/material/Box";
import { IoMdSearch } from "react-icons/io";

import {
  SearchBox,
  SearchIconWrapper,
  StyledInputBase,
} from "../assets/css/muiStyles";
import {
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { RiFileSearchFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { SearchPost } from "../store/reducer/postReducer";

const Search = () => {
  const dispatch = useDispatch();
  const [searchVal,setSearchVal] = useState("");

  const searchPostByTitle = () =>{
    dispatch(SearchPost(searchVal))
  }

  const handleKeyPress = (e) =>{
    if(e.key === 'Enter'){
      dispatch(SearchPost(searchVal))
    }
  }
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          // background: "#e9e9e9",
          py: 3,
        }}
      >
        <Container maxWidth="sm">
          <TextField
            // {...params}
            fullWidth
            placeholder="Search blog by title"
            value={searchVal}
            onChange={(e)=>setSearchVal(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{display:searchVal && 'none',fontSize:'24px'}}>
                  <IoSearch />
                </InputAdornment>
              ),
              endAdornment: (
                <Tooltip title="search post">
                <InputAdornment
                  type="button"
                  sx={{ display: !searchVal && 'none',fontSize:'24px',cursor:'pointer' }}
                  aria-label="search"
                  onClick={searchPostByTitle}
                  onKey
                >
                  <IoSearch />
                 
                </InputAdornment>
                </Tooltip>
              ),
            }}
            sx={{ borderRadius: "20px",  }}
          />
          
        </Container>
      </Box>
    </>
  );
};

export default Search;

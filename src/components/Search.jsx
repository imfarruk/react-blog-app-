import React from 'react'
import Box from "@mui/material/Box";
import { IoMdSearch } from "react-icons/io";

import {
    SearchBox,
    SearchIconWrapper,
    StyledInputBase,
  } from "../assets/css/muiStyles";
import { Container, InputAdornment, TextField } from '@mui/material';

const Search = () => {
  return (
    <>
     <Box sx={{
                flexGrow: 1,
            background:'#e9e9e9',
                py:2
              }}>
                <Container maxWidth="sm">

                <TextField
            // {...params}
            fullWidth
            placeholder="Search blog"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMdSearch />
                  </InputAdornment>
                ),
              }}

              sx={{borderRadius:'20px'}}
          />
              {/* <SearchBox sx={{width:'100%'}}>
                <SearchIconWrapper>
                  <IoMdSearch />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </SearchBox> */}
              </Container>
            </Box>
    </>
  )
}

export default Search
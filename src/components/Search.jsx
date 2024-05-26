import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { IoMdSearch } from "react-icons/io";

import {
  SearchBox,
  SearchIconWrapper,
  StyledInputBase,
} from "../assets/css/muiStyles";
import {
  Button,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { RiFileSearchFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { SearchPost, getAllPost } from "../store/reducer/postReducer";
import { getAllTags } from "../store/reducer/tagsReducer";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 50,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Search = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { tags, loading } = useSelector((state) => state.tag);
  const [searchVal, setSearchVal] = useState([]);

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const searchPostByTitle = () => {
    dispatch(SearchPost(searchVal));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchVal.length === 0) {
        dispatch(getAllPost());
      } else {
        dispatch(SearchPost(searchVal));
      }
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearchVal(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };


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
          {/* <TextField
            // {...params}
            fullWidth
            placeholder="Search blog by multiple tags"
            value={searchVal}
            onChange={(e)=>setSearchVal(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment 
                position="start" 
                
                sx={{display:searchVal && 'none',fontSize:'24px'}}>
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
                 
                >
                  <IoSearch />
                 
                </InputAdornment>
                </Tooltip>
              ),
            }}
            sx={{ borderRadius: "20px",  }}
          /> */}
          {/* <Stack direction="row"> */}
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Search blog by multiple tag
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-multiple-chip"
              multiple
              fullWidth
              value={searchVal}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
              label="Search blog by multiple tag"
            >
              <MenuItem disabled value="">
                <em>Search blog by multiple tag</em>
              </MenuItem>
              {tags.map((name) => (
                <MenuItem
                  key={name.tagName}
                  value={name.tagName}
                  style={getStyles(name.tagName, searchVal, theme)}
                >
                  {name.tagName}
                </MenuItem>
              ))}
            </Select>
           
          </FormControl>
          {
            searchVal.length !==0 && (
              <Button onClick={searchPostByTitle}>Search</Button>
            )
          }
        
          {/* </Stack> */}
        </Container>
      </Box>
    </>
  );
};

export default Search;

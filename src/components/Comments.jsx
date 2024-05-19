import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import imgPost from "../logo.svg";

const Comments = () => {
    const [openAction,setOpenAction] = useState(false);
  const date = new Date().toLocaleString();

  const openActionButton = () =>{
    setOpenAction(!openAction)
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{  }}>
        {/* <Stack> */}
        <Box sx={{ display: "flex" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={1}>
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                <img src={imgPost} />
              </Avatar>
            </Grid>
            <Grid item xs={12} sm={11}>
              <Stack >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>
                     Farhan Haider
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>

                  <Typography sx={{ fontSize: "12px", opacity: 0.7, pl: 1 }}>
                    {" "}
                    {moment().format("MMMM Do YYYY")}
                  </Typography>
                 
                    <IconButton
                size="small"
                aria-label="menu list"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <BsThreeDotsVertical />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                
              >
                
                  <MenuItem
                    sx={{
                      width: 'fit-content',
                      py:0
                    }}
                    // key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                    //   navigate(page);
                    }}
                  >
                    <Typography sx={{    display: 'flex',alignItems: 'center'}} >Delete <MdDelete/></Typography>
                  </MenuItem>
               
              </Menu>
                   
                  </Stack>
                </Box>
                <Typography sx={{textAlign: 'left',fontSize: "14px"}}>
                  dhfiushf sahfhsd fsahdfhsfiu h fdb gfdjhgdfs ghdfsgjh hdfsk
                  ghkjdsfhgdfs ghdfkjh gdfs jfdshg dsfgjhdsfjkg dshgkdjshgjkdsfh
                  fh sd fshdaf hsdhsaf heuhfnd sdhfjhsdfiu eruhg dvhds fvhdsvf
                  herughvuiwherv ehriuh
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{my:1}}/>
        <Stack spacing={2} mt={2}>
          <TextField multiline rows={2} placeholder="Please share your view" />
          <Button endIcon={<FaLocationArrow />}>Submit</Button>
        </Stack>

        {/* </Stack> */}
      </Box>
    </>
  );
};

export default Comments;

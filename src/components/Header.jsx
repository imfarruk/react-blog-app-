import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import { Link, useNavigate } from "react-router-dom";

// import { MaterialUISwitch } from "../css/muiStyle";
import { IoMdMenu } from "react-icons/io";
import { useTheme } from "@mui/material/styles";
import { MaterialUISwitch, linkStyles } from "../assets/css/muiStyles";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, FormControlLabel } from "@mui/material";
import { logoutUser } from "../store/reducer/authReducer";

// importing styles

const pages1 = ["home", "login", "signup"];
const settings = ["profile", "sign out"];

const Header = ({ check, change }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading ,user} = useSelector((state) => state.auth);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const signOutUser = () =>{
    dispatch(logoutUser())
  }
  const theme = useTheme();
  let newDate = new Date();
  let date = newDate.getDate();
  let month = new Date().toLocaleString("en-US", { month: "short" });
  let year = newDate.getFullYear();

  return (
    <>
      <Box sx={{ flexGrow: 1, px: 1 }}>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { sm: "space-between", xs: "flex-end" },
            marginRight: "16px",
            alignItems: { xs: "flex-end", sm: "center" },
          }}
        >
           <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} onChange={change} checked={check === 'dark'} />}
            label={theme.palette.mode === "light" ? "Light Mode" : "Dark Mode"}
            sx={{ mr: { xs: 0, sm: 1 }, ml: '2px',color: "text.primary" }}
          />
          <Typography sx={{color: "text.primary",}}>
            DATE ⌚ {date}:{month}:{year}
          </Typography>
        </FormGroup>
      </Box>

      <AppBar
        position="sticky"
        sx={{ height: "12vh", display: "flex", alignItems: "center" }}
      >
        <Container maxWidth="xl" sx={{ margin: "auto" }}>
          <Toolbar disableGutters>
            {/* small screen */}

            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                textDecoration: "none",
                color: "inherit",
                fontWeight: 700,
                letterSpacing: ".2rem",
                justifyContent: "center",
              }}
            >
              <Link to="/home" style={{ ...linkStyles }}>
                We Blogg
              </Link>
            </Typography>
            {!isAuthenticated && (
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: "flex", md: "none" },
                }}
              >
                <IconButton
                  size="large"
                  aria-label="menu list"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <IoMdMenu />
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
                  sx={{
                    mt: 2,
                    display: { xs: "flex", md: "none" },
                  }}
                >
                  <MenuItem
                    sx={{
                      width: 400,
                      background: "inherit",
                      textTransform: "uppercase",
                    }}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/home");
                    }}
                  >
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>

                  <MenuItem
                    sx={{
                      width: 400,
                      background: "inherit",
                      textTransform: "uppercase",
                    }}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/login");
                    }}
                  >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>

                  <MenuItem
                    sx={{
                      width: 400,
                      background: "inherit",
                      textTransform: "uppercase",
                    }}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/signup");
                    }}
                  >
                    <Typography textAlign="center">Signup</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}

            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                flexGrow: 1,
                fontWeight: 800,
                display: { xs: "none", md: "flex" },
                textDecoration: "none",
                color: "white",
                letterSpacing: ".2rem",
              }}
            >
              <Link to="/home" style={{ ...linkStyles }}>
              We Blogg
              </Link>
            </Typography>

            {!isAuthenticated && (
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Button
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/home");
                  }}
                  sx={{
                    ml: 5,
                    color: "white",
                    display: "block",
                  }}
                >
                  home
                </Button>
                <Button
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/login");
                  }}
                  sx={{
                    ml: 5,
                    color: "white",
                    display: "block",
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/signup");
                  }}
                  sx={{
                    ml: 5,
                    color: "white",
                    display: "block",
                  }}
                >
                  signup
                </Button>
              </Box>
            )}
            {isAuthenticated && (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user?.photoURL} />
                </IconButton>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
             
                    <MenuItem
                      onClick={()=>{handleCloseUserMenu();navigate('/profile')}}
                    >
                      <Typography textAlign="center" >Profile</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={()=>{signOutUser();handleCloseUserMenu()}}
                    >
                      <Typography textAlign="center">Sign out</Typography>
                    </MenuItem>
             
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Header;

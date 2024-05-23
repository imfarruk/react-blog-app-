import { createTheme } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e464a",
    },
    secondary: {
      main: "#494c7d",
    },
    background: {
      default: "#d9e9c9", // Custom background color for light mode
      paper: "#e0edd3"
    },
    text:{
        primary:"#000000"
    },
    paper:{
        main: "#1e464a",
    }
    // color: {
    //   default: "#1e464a",
    // },
    // typography: {
    //   color: "#1e464a",
    // },
    // button: {
    //   color: "#ffffff",
    //   bg: "#1e464a",
    // },
    // card: {
    //   default: "#e6eeef",
    // },
    // typewriter: {
    //   default: deepOrange[900],
    // },
    // animation: {
    //   color: "#000000",
    // },
  },
});

export default lightTheme;

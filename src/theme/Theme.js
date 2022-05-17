import { createTheme } from "@mui/material";

const colors = {
  notQuiteBlack: "#23272A",
  blurple: "#5865F2",
  white: "#fff",
  grey: "#36393E",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.notQuiteBlack,
    },
    secondary: {
      main: colors.blurple,
    },
    light: {
      main: colors.white,
    },
    bg: {
      main: colors.grey,
    },
  },
});

export default theme;

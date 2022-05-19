import { createTheme } from "@mui/material";

const colors = {
  notQuiteBlack: "#23272A",
  blurple: "#5865F2",
  white: "#fff",
  grey: "#36393E",
  darkGrey: "#2c2f33",
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
    bgPrimary: {
      main: colors.grey,
    },
    bgSecondary: {
      main: colors.darkGrey,
    },
  },
  typography: {
    allVariants: {
      color: colors.white,
    },
  },
});

export default theme;

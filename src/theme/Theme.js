import { createTheme } from "@mui/material";

const colors = {
  notQuiteBlack: "#23272A",
  blurple: "#5865F2",
  white: "#fff",
  notQuiteWhite: "#d3d3d3",
  grey: "#36393E",
  darkGrey: "#2c2f33",
};

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "14px",
          },
          "*::-webkit-scrollbar-track": {
            display: "none",
          },
          "*::-webkit-scrollbar-thumb": {
            background: colors.blurple,
            backgroundClip: "padding-box",
            border: "4px solid transparent",
            borderRadius: "9999px",
          },
        },
      },
    },
  },
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
    lowLight: {
      main: colors.notQuiteWhite,
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

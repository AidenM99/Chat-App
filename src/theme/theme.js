const darkPalette = {
  notQuiteBlack: "#23272A",
  notQuiteWhite: "#d3d3d3",
  grey: "#36393E",
  lighterGrey: "rgba(255, 255, 255, 0.15)",
  darkerGrey: "#2c2f33",
  blurple: "#5865F2",
  golden: "#fbbb04",
  white: "#fff",
};

const lightPalette = {
  black: "#000",
  white: "#fff",
  grey: "rgba(0, 0, 0, 0.6)",
  lighterGrey: "#f8f8f8",
  darkerGrey: "rgba(0, 0, 0, 0.12)",
  blurple: "#5865F2",
  golden: "#fbbb04",
};

const getThemePref = () => {
  return localStorage.getItem("theme");
};

const getDesignTokens = (mode) => ({
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
            background: "#5865F2",
            backgroundClip: "padding-box",
            border: "4px solid transparent",
            borderRadius: "9999px",
          },
        },
      },
    },
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: lightPalette.black,
          },
          secondary: {
            main: lightPalette.blurple,
          },
          bgPrimary: {
            main: lightPalette.white,
          },
          bgSecondary: {
            main: lightPalette.lighterGrey,
          },
          groupChat: {
            main: lightPalette.golden,
          },
          divider: {
            main: lightPalette.darkerGrey,
          },
          typography: {
            allVariants: {
              color: lightPalette.black,
            },
          },
          textSecondary: {
            main: lightPalette.grey,
          },
        }
      : {
          primary: {
            main: darkPalette.white,
          },
          secondary: {
            main: darkPalette.blurple,
          },
          bgPrimary: {
            main: darkPalette.grey,
          },
          bgSecondary: {
            main: darkPalette.darkerGrey,
          },
          groupChat: {
            main: darkPalette.golden,
          },
          divider: {
            main: darkPalette.lighterGrey,
          },
          typography: {
            allVariants: {
              color: darkPalette.white,
            },
          },
          textSecondary: {
            main: darkPalette.notQuiteWhite,
          },
        }),
  },
});

export { getThemePref, getDesignTokens };

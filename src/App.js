import SignIn from "./views/SignIn";
import Loading from "./views/Loading";
import Dashboard from "./views/Dashboard";
import { getAuth } from "firebase/auth";
import { useMemo, useState } from "react";
import { CssBaseline } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router } from "react-router-dom";
import { getDesignTokens, getThemePref } from "./theme/theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext, ColorModeContext } from "./hooks/Context";

function App() {
  const [user, loading] = useAuthState(getAuth());
  const [mode, setMode] = useState(getThemePref() ? getThemePref() : "dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem(
          "theme",
          getThemePref() === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  if (loading) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Loading />
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
  if (user) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <UserContext.Provider value={{ user }}>
              <Dashboard />
            </UserContext.Provider>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SignIn />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

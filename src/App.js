import SignIn from "./views/SignIn";
import theme from "./theme/Theme";
import Loading from "./views/Loading";
import Dashboard from "./views/Dashboard";
import { getAuth } from "firebase/auth";
import { ThemeProvider } from "@mui/material/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";

function App() {
  const [user, loading] = useAuthState(getAuth());

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Loading />
      </ThemeProvider>
    );
  }
  if (user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Dashboard />
        </Router>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignIn />
    </ThemeProvider>
  );
}

export default App;

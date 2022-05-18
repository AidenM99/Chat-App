import SignIn from "./views/SignIn";
import theme from "./theme/Theme";
import Loading from "./views/Loading";
import Dashboard from "./views/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

function App() {
  const [user, loading] = useAuthState(getAuth());

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Loading />
      </ThemeProvider>
    );
  }
  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <SignIn />
      </ThemeProvider>
    );
  }
  if (user) {
    return (
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    );
  }
}

export default App;

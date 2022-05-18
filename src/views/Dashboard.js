import { Box, Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";

function googleSignOut() {
  // Sign out of Firebase.
  signOut(getAuth());
}

const Dashboard = () => {
  return (
    <Box
      alignItems="center"
      backgroundColor="bg.main"
      display="flex"
      height="100vh"
      justifyContent="center"
      width="100vw"
    >
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => googleSignOut()}
      >
        Sign out
      </Button>
    </Box>
  );
};

export default Dashboard;

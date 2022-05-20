import LogoutIcon from "@mui/icons-material/Logout";
import { Box, IconButton } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";

function googleSignOut() {
  // Sign out of Firebase.
  signOut(getAuth());
}

const LogOut = () => {
  return (
    <Box>
      <IconButton onClick={() => googleSignOut()}>
        <LogoutIcon color="light" fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default LogOut;

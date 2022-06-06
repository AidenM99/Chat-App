import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Box, IconButton } from "@mui/material";

const googleSignOut = () => {
  signOut(getAuth());
};

const LogOut = () => {
  return (
    <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
      <Box>
        <IconButton onClick={googleSignOut}>
          <LogoutIcon color="light" fontSize="small" />
        </IconButton>
      </Box>
    </Link>
  );
};

export default LogOut;

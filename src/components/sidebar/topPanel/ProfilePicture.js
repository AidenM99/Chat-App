import { Box } from "@mui/material";
import { getAuth } from "firebase/auth";

const profilePicture = () => {
  return (
    <Box height="40px" width="40px">
      <Box
        alt="profile-picture"
        borderRadius="50%"
        component="img"
        height="100%"
        src={getAuth().currentUser.photoURL}
        referrerpolicy="no-referrer"
        width="100%"
      ></Box>
    </Box>
  );
};

export default profilePicture;

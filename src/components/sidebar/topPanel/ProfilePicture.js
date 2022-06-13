import { useContext } from "react";
import { Box } from "@mui/material";
import { UserContext } from "../../../hooks/UserContext";

const ProfilePicture = () => {
  const { user } = useContext(UserContext);

  return (
    <Box height="40px" width="40px">
      <Box
        alt="profile-picture"
        borderRadius="50%"
        component="img"
        height="100%"
        src={user.photoURL}
        referrerpolicy="no-referrer"
        width="100%"
      ></Box>
    </Box>
  );
};

export default ProfilePicture;

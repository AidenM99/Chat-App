import { useContext } from "react";
import { Box } from "@mui/material";
import { StyledAvatar } from "./TopPanel.styled";
import { UserContext } from "../../../hooks/UserContext";

const ProfilePicture = () => {
  const { user } = useContext(UserContext);

  return (
    <Box>
      <StyledAvatar src={user.photoURL} salt="profile-picture" />
    </Box>
  );
};

export default ProfilePicture;

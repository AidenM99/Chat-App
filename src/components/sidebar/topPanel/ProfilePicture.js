import { useContext } from "react";
import { Box } from "@mui/material";
import { StyledAvatar } from "./TopPanel.styled";
import { UserContext } from "../../../hooks/UserContext";

const ProfilePicture = () => {
  const { user } = useContext(UserContext);

  return (
    <Box>
      <StyledAvatar alt="profile-picture" src={user.photoURL} />
    </Box>
  );
};

export default ProfilePicture;

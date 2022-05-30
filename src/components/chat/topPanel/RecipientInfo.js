import { getAuth } from "firebase/auth";
import { Avatar, Box, Typography } from "@mui/material";

const RecipientInfo = ({ chatData }) => {
  const userId = Object.keys(chatData.members).filter(
    (key) => key !== getAuth().currentUser.uid
  );

  const userInfo = chatData.members[userId];

  return (
    <Box alignItems="center" display="flex">
      <Avatar
        alt="profile-picture"
        src={userInfo.profilePicture}
        sx={{ marginRight: "1rem" }}
      />
      <Typography>{userInfo.displayName}</Typography>
    </Box>
  );
};

export default RecipientInfo;

import ChatOptions from "./ChatOptions";
import { getAuth } from "firebase/auth";
import { Avatar, Box, Typography } from "@mui/material";

const RecipientInfo = ({ chatId, chatData }) => {
  const userId = Object.keys(chatData.members).filter(
    (key) => key !== getAuth().currentUser.uid
  );

  const userInfo = chatData.members[userId];

  return (
    <Box alignItems="center" display="flex" justifyContent="space-between">
      <Box alignItems="center" display="flex">
        <Avatar
          alt="profile-picture"
          src={userInfo.profilePicture}
          sx={{ mr: 2 }}
        />
        <Typography fontWeight="500">{userInfo.displayName}</Typography>
      </Box>
      <Box>
        <ChatOptions chatId={chatId} />
      </Box>
    </Box>
  );
};

export default RecipientInfo;

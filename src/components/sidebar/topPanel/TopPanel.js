import LogOut from "./LogOutButton";
import ProfilePicture from "./ProfilePicture";
import CreateChat from "./CreateChatButton";
import { Box, Typography } from "@mui/material";

const TopPanel = ({ userDetails, handleOpen }) => {
  return (
    <Box
      alignItems="center"
      borderBottom="1px solid rgba(255, 255, 255, 0.15)"
      display="flex"
      justifyContent="space-between"
      padding="0.75rem 0.5rem"
    >
      <Box display="flex" alignItems="center">
        <ProfilePicture userDetails={userDetails} />
        <Typography marginLeft="0.75rem">Your Chats</Typography>
      </Box>
      <Box display="flex">
        <CreateChat handleOpen={handleOpen} />
        <LogOut />
      </Box>
    </Box>
  );
};

export default TopPanel;

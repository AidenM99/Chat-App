import LogOut from "./LogOutButton";
import ProfilePicture from "./ProfilePicture";
import CreateChat from "./CreateChatButton";
import { Box, Typography } from "@mui/material";

const TopPanel = ({ handleOpen }) => {
  return (
    <Box
      alignItems="center"
      borderBottom="1px solid rgba(255, 255, 255, 0.15)"
      display="flex"
      justifyContent="space-between"
      sx={{ p: 1 }}
    >
      <Box display="flex" alignItems="center">
        <ProfilePicture />
        <Typography fontWeight="500" sx={{ ml: 2 }}>
          Your Chats
        </Typography>
      </Box>
      <Box display="flex">
        <CreateChat handleOpen={handleOpen} />
        <LogOut />
      </Box>
    </Box>
  );
};

export default TopPanel;

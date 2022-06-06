import LogOut from "./LogOut";
import CreateChat from "./CreateChat";
import ProfilePicture from "./ProfilePicture";
import { Box, Typography } from "@mui/material";

const TopPanel = () => {
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
        <CreateChat />
        <LogOut />
      </Box>
    </Box>
  );
};

export default TopPanel;

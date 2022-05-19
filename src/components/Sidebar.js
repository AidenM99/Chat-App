import LogOut from "../components/LogOut";
import CreateChat from "../components/CreateChat";
import ProfilePicture from "../components/ProfilePicture";
import NewChatModal from "../components/NewChatModal";
import { Box } from "@mui/material";
import { useState } from "react";

const Sidebar = ({ userDetails }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Box backgroundColor="bgSecondary.main" height="100vh" width="18.75rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <ProfilePicture userDetails={userDetails} />
        <Box display="flex">
          <CreateChat handleOpen={handleOpen} />
          <LogOut />
        </Box>
      </Box>
      <NewChatModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Sidebar;

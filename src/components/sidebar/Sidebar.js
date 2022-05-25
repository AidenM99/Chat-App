import TopPanel from "./topPanel/TopPanel";
import ChatsList from "./chatsList/ChatsList.js";
import UsersListModal from "./usersListModal/UsersListModal";
import { useState } from "react";
import { Box } from "@mui/material";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Box
      backgroundColor="bgSecondary.main"
      borderRight="1px solid rgba(255, 255, 255, 0.15)"
      display="flex"
      flexDirection="column"
      height="100vh"
      width="18.75rem"
    >
      <TopPanel handleOpen={handleOpen} />
      <ChatsList />
      {open ? <UsersListModal handleClose={handleClose} /> : null}
    </Box>
  );
};

export default Sidebar;

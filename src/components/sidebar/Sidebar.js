import TopPanel from "./topPanel/TopPanel";
import ChatsList from "./chatsList/ChatsList.js";
import UsersListModal from "./usersListModal/UsersListModal";
import { useState } from "react";
import { Box } from "@mui/material";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Box
      backgroundColor="bgSecondary.main"
      borderRight="1px solid rgba(255, 255, 255, 0.15)"
      display="flex"
      flexDirection="column"
      height="100vh"
      width="18.75rem"
    >
      <TopPanel openModal={openModal} />
      <ChatsList />
      {open ? <UsersListModal closeModal={closeModal} /> : null}
    </Box>
  );
};

export default Sidebar;

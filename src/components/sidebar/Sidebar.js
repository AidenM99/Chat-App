import LogOut from "./LogOutButton";
import CreateChat from "./CreateChatButton";
import ProfilePicture from "./ProfilePicture";
import NewChatModal from "./chatModal/ChatModal";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Sidebar = ({ userDetails }) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      async function retrieveUsers() {
        const allUsers = await getDocs(
          query(collection(db, "users"), orderBy("name"))
        );

        const users = [];

        allUsers.forEach((user) => {
          users.push(user.data());
        });

        setUserData(users);
      }

      retrieveUsers();
    }
  }, [open]);

  return (
    <Box
      backgroundColor="bgSecondary.main"
      borderRight="1px solid rgba(255, 255, 255, 0.15)"
      height="100vh"
      width="18.75rem"
    >
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
      <NewChatModal open={open} handleClose={handleClose} userData={userData} />
    </Box>
  );
};

export default Sidebar;

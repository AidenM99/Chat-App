import TopPanel from "./topPanel/TopPanel";
import ChatsList from "./chatsList/ChatsList.js";
import UsersListModal from "./usersListModal/UsersListModal";
import { db } from "../../firebase";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Sidebar = ({ userDetails }) => {
  const [open, setOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [chatsList, setChatsList] = useState([]);

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

        setUsersList(users);
      }

      retrieveUsers();
    }
  }, [open]);

  return (
    <Box
      backgroundColor="bgSecondary.main"
      borderRight="1px solid rgba(255, 255, 255, 0.15)"
      display="flex"
      flexDirection="column"
      height="100vh"
      width="18.75rem"
    >
      <TopPanel userDetails={userDetails} handleOpen={handleOpen} />
      <ChatsList chatsList={chatsList} />
      <UsersListModal
        open={open}
        usersList={usersList}
        setChatsList={setChatsList}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default Sidebar;

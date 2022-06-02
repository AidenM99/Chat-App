import UserData from "./UserData";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Box, List, Modal, Typography } from "@mui/material";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const UsersListModal = ({ closeModal }) => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    async function retrieveUsers() {
      const allUsers = await getDocs(
        query(collection(db, "users"), orderBy("displayName"))
      );

      const users = [];

      allUsers.forEach((user) => {
        users.push(user.data());
      });

      setUsersList(users);
    }

    retrieveUsers();
  }, []);

  return (
    <Box>
      <Modal
        open={true}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          backgroundColor="bgSecondary.main"
          border="2px solid rgba(255, 255, 255, 0.15)"
          left="50%"
          position="absolute"
          top="50%"
          sx={{
            p: 5,
            boxShadow: 24,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            textAlign="center"
            sx={{ mb: 5 }}
          >
            Create New Chat
          </Typography>
          <List
            dense
            sx={{ height: "200px", overflow: "auto", width: "275px" }}
          >
            {usersList.map((userData, index) =>
              userData.uid === getAuth().currentUser.uid ? null : (
                <UserData key={index} userData={userData} />
              )
            )}
          </List>
        </Box>
      </Modal>
    </Box>
  );
};

export default UsersListModal;

import UserData from "./UserData";
import { StyledUsersList } from "./styles";
import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";

const UsersListModal = ({ handleClose }) => {
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
        onClose={handleClose}
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
            p: "0.5rem",
            boxShadow: 24,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            textAlign="center"
            sx={{ mt: "0.5rem", mb: "1rem" }}
          >
            Create New Chat
          </Typography>
          <StyledUsersList dense>
            {usersList.map((userData, index) =>
              userData.uid === getAuth().currentUser.uid ? null : (
                <UserData key={index} userData={userData} />
              )
            )}
          </StyledUsersList>
        </Box>
      </Modal>
    </Box>
  );
};

export default UsersListModal;

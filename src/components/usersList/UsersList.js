import UserData from "./UserData";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Box, Button, List, Typography } from "@mui/material";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const UsersList = ({
  chatType,
  userDataClickHandler,
  handleGroupButtonConfirm,
}) => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    async function retrieveUsers() {
      const allUsers = await getDocs(
        query(collection(db, "users"), orderBy("displayName"))
      );

      setUsersList(allUsers.docs.map((doc) => doc.data()));
    }

    retrieveUsers();
  }, []);

  return (
    <Box
      backgroundColor="bgSecondary.main"
      border="2px solid rgba(255, 255, 255, 0.15)"
      left="50%"
      position="absolute"
      top="50%"
      sx={{
        py: 3.5,
        px: 5,
        boxShadow: 24,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography
        id="modal-modal-title"
        variant="h6"
        textAlign="center"
        sx={{ mb: 3.5 }}
      >
        Create New Chat
      </Typography>
      <List dense sx={{ height: "200px", overflow: "auto", width: "275px" }}>
        {usersList.map((userData, index) =>
          userData.uid === getAuth().currentUser.uid ? null : (
            <UserData
              key={index}
              userData={userData}
              userDataClickHandler={userDataClickHandler}
            />
          )
        )}
      </List>
      {chatType === 2 ? (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 3.5 }}
          onClick={handleGroupButtonConfirm}
        >
          Confirm
        </Button>
      ) : null}
    </Box>
  );
};

export default UsersList;

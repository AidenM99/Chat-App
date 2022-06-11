import UsersListItem from "./UsersListItem";
import { db } from "../../firebase";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { UserContext } from "../../utils/UserContext";
import { Box, Button, List, Typography } from "@mui/material";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const UsersList = ({
  chatType,
  userDataClickHandler,
  handleGroupButtonConfirm,
  updating,
}) => {
  const { user } = useContext(UserContext);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    async function retrieveUsers() {
      const allUsers = await getDocs(
        query(collection(db, "users"), orderBy("displayName"))
      );

      setUsersList(
        allUsers.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        })
      );
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
        {updating ? "Add User" : "Create New Chat"}
      </Typography>
      <List dense sx={{ height: "200px", overflow: "auto", width: "275px" }}>
        {usersList.map((userData) =>
          userData.data.uid === user.uid ? null : (
            <UsersListItem
              key={userData.id}
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

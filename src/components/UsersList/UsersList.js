import UsersListItem from "./UsersListItem";
import { db } from "../../firebase";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { UserContext } from "../../hooks/Context";
import { StyledContainer, StyledList } from "./UsersList.styled";
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
    <StyledContainer sx={{ boxShadow: 24 }}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        textAlign="center"
        sx={{ mb: 3.5 }}
      >
        {updating ? "Add User" : "Create New Chat"}
      </Typography>
      <StyledList dense>
        {usersList.map((userData) =>
          userData.data.uid === user.uid ? null : (
            <UsersListItem
              key={userData.id}
              userData={userData}
              userDataClickHandler={userDataClickHandler}
            />
          )
        )}
      </StyledList>
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
    </StyledContainer>
  );
};

export default UsersList;

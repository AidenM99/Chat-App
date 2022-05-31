import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

const UserData = ({ userData }) => {
  const isExistingChat = async (userData) => {
    const chatsColRef = collection(db, "chats");

    const chatsQuery = query(
      chatsColRef,
      where(`members.${getAuth().currentUser.uid}.inChat`, "==", true),
      where(`members.${userData.uid}.inChat`, "==", true)
    );

    const chatsSnap = await getDocs(chatsQuery);

    if (chatsSnap.empty) return false;
    return true;
  };

  const addNewPrivateChat = async (userData) => {
    if (!(await isExistingChat(userData))) {
      addDoc(collection(db, "chats"), {
        members: {
          [getAuth().currentUser.uid]: {
            inChat: true,
            displayName: getAuth().currentUser.displayName,
            profilePicture: getAuth().currentUser.photoURL,
          },
          [userData.uid]: {
            inChat: true,
            displayName: userData.displayName,
            profilePicture: userData.photoURL,
          },
        },

        createdBy: getAuth().currentUser.displayName,
        createdAt: serverTimestamp(),
        lastMessage: undefined,
      });
    }
  };

  return (
    <ListItem button divider onClick={() => addNewPrivateChat(userData)}>
      <ListItemAvatar>
        <Avatar alt="profile-picture" src={userData.photoURL}></Avatar>
      </ListItemAvatar>
      <ListItemText primaryTypographyProps={{ noWrap: true }}>
        {userData.displayName}
      </ListItemText>
    </ListItem>
  );
};

export default UserData;

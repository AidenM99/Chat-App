import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const UserData = ({ userData }) => {
  const showChat = (chatsSnap) => {
    chatsSnap.docs.map(async (chat) => {
      const chatRef = doc(db, "chats", chat.id);

      await updateDoc(chatRef, {
        [`members.${getAuth().currentUser.uid}.isHidingChat`]: false,
      });
    });
  };

  const isExistingChat = async (userData) => {
    const chatsColRef = collection(db, "chats");

    const chatsQuery = query(
      chatsColRef,
      where(`members.${getAuth().currentUser.uid}.inChat`, "==", true),
      where(`members.${userData.uid}.inChat`, "==", true)
    );

    const chatsSnap = await getDocs(chatsQuery);

    if (chatsSnap.empty) {
      return false;
    } else {
      showChat(chatsSnap);

      return true;
    }
  };

  const addNewPrivateChat = async (userData) => {
    if (!(await isExistingChat(userData))) {
      addDoc(collection(db, "chats"), {
        members: {
          [getAuth().currentUser.uid]: {
            inChat: true,
            isHidingChat: false,
            displayName: getAuth().currentUser.displayName,
            profilePicture: getAuth().currentUser.photoURL,
          },
          [userData.uid]: {
            inChat: true,
            isHidingChat: true,
            displayName: userData.displayName,
            profilePicture: userData.photoURL,
          },
        },

        createdBy: getAuth().currentUser.displayName,
        createdAt: serverTimestamp(),
        lastMessage: null,
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

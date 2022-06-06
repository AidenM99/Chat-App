import AddIcon from "@mui/icons-material/Add";
import UsersList from "../../usersList/UsersList";
import { useState } from "react";
import { db } from "../../../firebase";
import { StyledMenu } from "./styles";
import { getAuth } from "firebase/auth";
import { Box, IconButton, MenuItem, Modal } from "@mui/material";
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

const CreateChat = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatType, setChatType] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usersModalOpen, setUsersModalOpen] = useState(false);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = (e) => {
    setAnchorEl(null);
  };

  const openUsersModal = () => {
    setUsersModalOpen(true);
  };

  const closeUsersModal = () => {
    setUsersModalOpen(false);
  };

  const changeChatType = (type) => {
    setChatType(type);

    openUsersModal();
  };

  const userDataClickHandler = (userData) => {
    if (chatType === 1) {
      addNewPrivateChat(userData);
    } else {
      setSelectedUsers((prevState) => [...prevState, userData]);
    }
  };

  const showChat = (chatsSnap) => {
    chatsSnap.docs.map(async (chat) => {
      const chatRef = doc(db, "chats", chat.id);

      await updateDoc(chatRef, {
        [`memberInfo.${getAuth().currentUser.uid}.isHidingChat`]: false,
      });
    });
  };

  const isExistingChat = async (userData) => {
    const chatsColRef = collection(db, "chats");

    const chatsQuery = query(
      chatsColRef,
      where(`memberInfo.${getAuth().currentUser.uid}.inChat`, "==", true),
      where(`memberInfo.${userData.uid}.inChat`, "==", true)
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
        members: [getAuth().currentUser.uid, userData.uid],
        memberInfo: {
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
        lastMessage: null,
        lastActive: serverTimestamp(),
        createdAt: serverTimestamp(),
        createdBy: getAuth().currentUser.displayName,
      });
    }
  };

  return (
    <Box>
      <IconButton onClick={openMenu}>
        <AddIcon color="light" fontSize="small" />
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        onClick={closeMenu}
      >
        <MenuItem onClick={() => changeChatType(1)}>Private Chat</MenuItem>
        <MenuItem onClick={() => changeChatType(2)}>Group Chat</MenuItem>
      </StyledMenu>
      <Modal open={usersModalOpen} onClose={closeUsersModal}>
        <Box>
          <UsersList
            chatType={chatType}
            userDataClickHandler={userDataClickHandler}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateChat;

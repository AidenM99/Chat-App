import UsersList from "../../UsersList/UsersList";
import AddIcon from "@mui/icons-material/Add";
import NameGroup from "../../NameGroup/NameGroup";
import { useState } from "react";
import { useContext } from "react";
import { db } from "../../../firebase";
import { StyledMenu } from "./TopPanel.styled";
import { UserContext } from "../../../hooks/Context";
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
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatType, setChatType] = useState(null);
  const [usersModalOpen, setUsersModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([{ uid: user.uid }]);
  const [nameGroupModalOpen, setNameGroupModalOpen] = useState(false);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = (e) => {
    setAnchorEl(null);
  };

  const openUsersModal = () => {
    setUsersModalOpen(true);

    setSelectedUsers([{ uid: user.uid }]);
  };

  const closeUsersModal = () => {
    setUsersModalOpen(false);
  };

  const openNameGroupModal = () => {
    closeUsersModal();

    setNameGroupModalOpen(true);
  };

  const closeNameGroupModal = () => {
    setNameGroupModalOpen(false);
  };

  const changeChatType = (type) => {
    setChatType(type);

    openUsersModal();
  };

  const addUserToGroupChat = (userData) => {
    const filterSelectedUsers = selectedUsers.filter(
      (user) => user.uid === userData.data.uid
    );

    if (filterSelectedUsers.length === 0) {
      setSelectedUsers((prevState) => [...prevState, userData.data]);
    } else {
      setSelectedUsers((prevState) => {
        return prevState.filter((user) => user.uid !== userData.data.uid);
      });
    }
  };

  const userDataClickHandler = (userData) => {
    if (chatType === 1) {
      addNewPrivateChat(userData);
    } else {
      addUserToGroupChat(userData);
    }
  };

  const showChat = (chatsSnap) => {
    chatsSnap.docs.map(async (chat) => {
      const chatRef = doc(db, "chats", chat.id);

      await updateDoc(chatRef, {
        [`memberInfo.${user.uid}.isHidingChat`]: false,
      });
    });
  };

  const isExistingChat = async (userData) => {
    const chatsColRef = collection(db, "chats");

    const chatsQuery = query(
      chatsColRef,
      where(`memberInfo.${user.uid}.inChat`, "==", true),
      where(`memberInfo.${userData.data.uid}.inChat`, "==", true)
    );

    const chatsSnap = await getDocs(chatsQuery);

    if (chatsSnap.empty) {
      return false;
    } else {
      showChat(chatsSnap);
      return true;
    }
  };

  const handleGroupButtonConfirm = () => {
    openNameGroupModal();
  };

  const addNewPrivateChat = async (userData) => {
    if (!(await isExistingChat(userData))) {
      addDoc(collection(db, "chats"), {
        members: [user.uid, userData.data.uid],
        memberInfo: {
          [user.uid]: {
            inChat: true,
            isHidingChat: false,
            displayName: user.displayName,
            profilePicture: user.photoURL,
          },
          [userData.data.uid]: {
            inChat: true,
            isHidingChat: true,
            displayName: userData.data.displayName,
            profilePicture: userData.data.photoURL,
          },
        },
        lastMessage: null,
        lastActive: serverTimestamp(),
        createdAt: serverTimestamp(),
        createdBy: user.displayName,
        type: 1,
      });
    }

    closeUsersModal();
  };

  const addNewGroupChat = (groupName) => {
    addDoc(collection(db, "chats"), {
      groupName: groupName,
      members: selectedUsers.map((user) => user.uid),
      lastMessage: null,
      lastActive: serverTimestamp(),
      createdAt: serverTimestamp(),
      createdBy: user.displayName,
      type: 2,
    });

    closeNameGroupModal();
  };

  return (
    <Box>
      <IconButton aria-label="create-chat" onClick={openMenu}>
        <AddIcon color="primary" fontSize="small" />
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
            handleGroupButtonConfirm={handleGroupButtonConfirm}
          />
        </Box>
      </Modal>
      <Modal open={nameGroupModalOpen} onClose={closeNameGroupModal}>
        <Box>
          <NameGroup addNewGroupChat={addNewGroupChat} />
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateChat;

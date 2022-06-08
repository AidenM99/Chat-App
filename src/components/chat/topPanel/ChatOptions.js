import UsersList from "../../usersList/UsersList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useContext } from "react";
import { db } from "../../../firebase";
import { StyledMenu } from "./styles";
import { Link } from "react-router-dom";
import { UserContext } from "../../../utils/UserContext";
import { Box, IconButton, MenuItem, Modal } from "@mui/material";
import {
  doc,
  updateDoc,
  arrayRemove,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

const ChatOptions = ({ chatData, chatId }) => {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
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

    setSelectedUsers([]);
  };

  const closeUsersModal = () => {
    setUsersModalOpen(false);

    setSelectedUsers([]);
  };

  const hideChat = async () => {
    const chatRef = doc(db, "chats", chatId);

    await updateDoc(chatRef, {
      [`memberInfo.${user.uid}.isHidingChat`]: true,
    });
  };

  const leaveGroup = async () => {
    const chatRef = doc(db, "chats", chatId);

    await updateDoc(chatRef, {
      members: arrayRemove(user.uid),
    });
  };

  const userDataClickHandler = async (userData) => {
    const docRef = doc(db, "chats", chatId);
    const docSnap = await getDoc(docRef);

    const currentMembers = docSnap.data().members;
    const isCurrentMember = currentMembers.find(
      (user) => user === userData.uid
    );

    if (isCurrentMember) return;
    setSelectedUsers((prevState) => [...prevState, userData]);
  };

  const addUsersToGroupChat = () => {
    const docRef = doc(db, "chats", chatId);

    selectedUsers.map(async (user) => {
      await updateDoc(docRef, {
        members: arrayUnion(user.uid),
      });
    });

    closeUsersModal();
  };

  const handleGroupButtonConfirm = () => {
    addUsersToGroupChat();
  };

  return (
    <Box>
      <IconButton onClick={openMenu}>
        <MoreHorizIcon color="light" />
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {chatData.type === 1 ? (
          <MenuItem onClick={hideChat} component={Link} to={"/"}>
            Remove Chat
          </MenuItem>
        ) : (
          <Box>
            <MenuItem onClick={openUsersModal}>Add User</MenuItem>
            <MenuItem onClick={leaveGroup} component={Link} to={"/"}>
              Leave Group
            </MenuItem>
          </Box>
        )}
      </StyledMenu>
      <Modal open={usersModalOpen} onClose={closeUsersModal}>
        <Box>
          <UsersList
            chatType={chatData.type}
            userDataClickHandler={userDataClickHandler}
            handleGroupButtonConfirm={handleGroupButtonConfirm}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ChatOptions;

import UsersList from "../../UsersList/UsersList";
import MembersList from "../../MembersList/MembersList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useContext } from "react";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";
import { StyledMenu } from "./TopPanel.styled";
import { UserContext } from "../../../hooks/UserContext";
import { Box, IconButton, MenuItem, Modal } from "@mui/material";
import {
  doc,
  updateDoc,
  arrayRemove,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

const ChatOptions = ({ chatData }) => {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usersModalOpen, setUsersModalOpen] = useState(false);
  const [membersModalOpen, setMembersModalOpen] = useState(false);

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

  const openMembersModal = () => {
    setMembersModalOpen(true);
  };

  const closeMembersModal = () => {
    setMembersModalOpen(false);
  };

  const hideChat = async () => {
    const chatRef = doc(db, "chats", chatData.id);

    await updateDoc(chatRef, {
      [`memberInfo.${user.uid}.isHidingChat`]: true,
    });
  };

  const leaveGroup = async () => {
    const chatRef = doc(db, "chats", chatData.id);

    await updateDoc(chatRef, {
      members: arrayRemove(user.uid),
    });
  };

  const userDataClickHandler = async (userData) => {
    const chatRef = doc(db, "chats", chatData.id);
    const chatSnap = await getDoc(chatRef);

    const currentMembers = chatSnap.data().members;

    const isCurrentMember = currentMembers.find(
      (user) => user === userData.data.uid
    );

    if (isCurrentMember) return;
    setSelectedUsers((prevState) => [...prevState, userData.data]);
  };

  const addUsersToGroupChat = () => {
    const chatRef = doc(db, "chats", chatData.id);

    selectedUsers.map(async (user) => {
      await updateDoc(chatRef, {
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
      <IconButton aria-label="chat-options" onClick={openMenu}>
        <MoreHorizIcon color="light" />
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        onClick={closeMenu}
      >
        {chatData.data.type === 1 ? (
          <MenuItem onClick={hideChat} component={Link} to={"/"}>
            Remove Chat
          </MenuItem>
        ) : (
          <Box>
            <MenuItem onClick={openUsersModal}>Add User</MenuItem>
            <MenuItem onClick={openMembersModal}>View Members</MenuItem>
            <MenuItem onClick={leaveGroup} component={Link} to={"/"}>
              Leave Group
            </MenuItem>
          </Box>
        )}
      </StyledMenu>
      <Modal open={usersModalOpen} onClose={closeUsersModal}>
        <Box>
          <UsersList
            chatType={chatData.data.type}
            userDataClickHandler={userDataClickHandler}
            handleGroupButtonConfirm={handleGroupButtonConfirm}
            updating={true}
          />
        </Box>
      </Modal>
      <Modal open={membersModalOpen} onClose={closeMembersModal}>
        <Box>
          <MembersList chatData={chatData} />
        </Box>
      </Modal>
    </Box>
  );
};

export default ChatOptions;

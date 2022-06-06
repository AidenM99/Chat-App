import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { StyledMenu } from "./styles";
import { Box, IconButton, MenuItem } from "@mui/material";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const ChatOptions = ({ chatId }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = (e) => {
    setAnchorEl(null);
  };

  const deleteChat = async () => {
    const chatRef = doc(db, "chats", chatId);

    await updateDoc(chatRef, {
      [`memberInfo.${getAuth().currentUser.uid}.isHidingChat`]: true,
    });
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
        <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
          <MenuItem onClick={deleteChat}>Remove Chat</MenuItem>
        </Link>
      </StyledMenu>
    </Box>
  );
};

export default ChatOptions;

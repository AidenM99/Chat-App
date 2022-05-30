import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useState } from "react";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { StyledTextField } from "./styles";
import { Box, IconButton, InputAdornment } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";

const ChatInput = ({ chatId }) => {
  const [value, setValue] = useState();

  const handleKeyPress = (e) => {
    if (e.charCode === 13 && !e.shiftKey && value.trim() !== "") {
      saveMessage();

      setValue("");

      e.preventDefault();
    }
  };

  const saveMessage = () => {
    const chatsDocRef = doc(db, "chats", chatId);

    const chatsColRef = collection(chatsDocRef, "messages");

    addDoc(chatsColRef, {
      messageText: value,
      sentAt: serverTimestamp(),
      sentBy: getAuth().currentUser.displayName,
      profilePicture: getAuth().currentUser.photoURL,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <StyledTextField
        color="secondary"
        fullWidth
        maxRows={5}
        multiline
        value={value}
        inputProps={{
          maxLength: 1500,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <AddCircleIcon color="light"></AddCircleIcon>
              </IconButton>
            </InputAdornment>
          ),

          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SendIcon color="light"></SendIcon>
              </IconButton>
              <IconButton>
                <EmojiEmotionsIcon color="light"></EmojiEmotionsIcon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyPress={(e) => handleKeyPress(e)}
        onChange={(e) => setValue(e.target.value)}
      ></StyledTextField>
    </Box>
  );
};

export default ChatInput;

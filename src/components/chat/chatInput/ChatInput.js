import EmojiIcon from "./EmojiIcon";
import SendMsgIcon from "./SendMsgIcon";
import FilePickerIcon from "./FilePickerIcon";
import FilePickerAlert from "./FilePickerAlert";
import { useState } from "react";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { StyledTextField } from "./styles";
import { Box, InputAdornment } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const ChatInput = ({ chatId }) => {
  const [value, setValue] = useState("");
  const [snackbarActive, setSnackbarActive] = useState(false);

  const getLastMessage = (messageSnap) => {
    if (messageSnap.data().messageText) return messageSnap.data().messageText;
    return `${messageSnap.data().sentBy} sent an image`;
  };

  const getRecipient = (chatSnap) => {
    const userId = Object.keys(chatSnap.data().members).filter(
      (key) => key !== getAuth().currentUser.uid
    );

    return userId[0];
  };

  const updateChatStatus = async (chatsDocRef, chatsColRef, newMessage) => {
    const messageRef = doc(chatsColRef, newMessage.id);

    const messageSnap = await getDoc(messageRef);

    const chatSnap = await getDoc(chatsDocRef);

    await updateDoc(chatsDocRef, {
      lastMessage: getLastMessage(messageSnap),
      [`members.${getRecipient(chatSnap)}.isHidingChat`]: false,
    });
  };

  const saveMessage = async () => {
    const chatsDocRef = doc(db, "chats", chatId);

    const chatsColRef = collection(chatsDocRef, "messages");

    const newMessage = await addDoc(chatsColRef, {
      messageText: value,
      sentAt: serverTimestamp(),
      sentBy: getAuth().currentUser.displayName,
      profilePicture: getAuth().currentUser.photoURL,
    });

    updateChatStatus(chatsDocRef, chatsColRef, newMessage);
  };

  const handleKeyPress = (e) => {
    if (
      (e.charCode === 13 || e.currentTarget.id === "sendMessage") &&
      !e.shiftKey &&
      value.trim() !== ""
    ) {
      saveMessage();

      setValue("");

      e.preventDefault();
    }
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <StyledTextField
        color="secondary"
        fullWidth
        maxRows={5}
        multiline
        value={value}
        onKeyPress={handleKeyPress}
        onChange={handleValueChange}
        inputProps={{
          maxLength: 1500,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FilePickerIcon
                chatId={chatId}
                setSnackbarActive={setSnackbarActive}
                updateChatStatus={updateChatStatus}
              />
            </InputAdornment>
          ),

          endAdornment: (
            <InputAdornment position="end">
              <SendMsgIcon handleKeyPress={handleKeyPress} />
              <EmojiIcon value={value} setValue={setValue} />
            </InputAdornment>
          ),
        }}
      ></StyledTextField>
      <FilePickerAlert
        snackbarActive={snackbarActive}
        setSnackbarActive={setSnackbarActive}
      />
    </Box>
  );
};

export default ChatInput;

import EmojiIcon from "./EmojiIcon";
import SendMsgIcon from "./SendMsgIcon";
import FilePickerIcon from "./FilePickerIcon";
import FilePickerAlert from "../../alerts/FilePickerAlert";
import { useState } from "react";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { StyledTextField } from "./styles";
import { Box, InputAdornment } from "@mui/material";
import { getOtherPrivateChatMember } from "../../../utils/utils";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const ChatInput = ({ chatId, chatData }) => {
  const [value, setValue] = useState("");
  const [alertActive, setAlertActive] = useState(false);

  const saveMessage = async (newImageMessage) => {
    const chatDocRef = doc(db, "chats", chatId);

    if (!newImageMessage) {
      const messagesRef = collection(chatDocRef, "messages");

      await addDoc(messagesRef, {
        messageText: value,
        sentAt: serverTimestamp(),
        sentBy: getAuth().currentUser.displayName,
        profilePicture: getAuth().currentUser.photoURL,
      });
    }

    await updateDoc(chatDocRef, {
      lastActive: serverTimestamp(),
      lastMessage: newImageMessage
        ? `${getAuth().currentUser.displayName} sent an image`
        : value,
      [`memberInfo.${getOtherPrivateChatMember(chatData)}.isHidingChat`]: false,
    });
  };

  const handleKeyPress = (e) => {
    if (
      (e.charCode === 13 || e.currentTarget.id === "sendMessage") &&
      !e.shiftKey &&
      value.trim() !== ""
    ) {
      e.preventDefault();
      saveMessage();
      setValue("");
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
                saveMessage={saveMessage}
                setAlertActive={setAlertActive}
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
        alertActive={alertActive}
        setAlertActive={setAlertActive}
      />
    </Box>
  );
};

export default ChatInput;

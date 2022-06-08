import EmojiIcon from "./EmojiIcon";
import SendMsgIcon from "./SendMsgIcon";
import FilePickerIcon from "./FilePickerIcon";
import { useState } from "react";
import { useContext } from "react";
import { db } from "../../../firebase";
import { StyledTextField } from "./styles";
import { UserContext } from "../../../utils/UserContext";
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
  const { user } = useContext(UserContext);
  const [value, setValue] = useState("");

  const saveMessage = async (newImageMessage) => {
    const chatDocRef = doc(db, "chats", chatId);

    if (!newImageMessage) {
      const messagesRef = collection(chatDocRef, "messages");

      await addDoc(messagesRef, {
        messageText: value,
        sentAt: serverTimestamp(),
        sentBy: user.displayName,
        profilePicture: user.photoURL,
      });
    }

    if (chatData.type === 1) {
      await updateDoc(chatDocRef, {
        lastActive: serverTimestamp(),
        lastMessage: newImageMessage
          ? `${user.displayName} sent an image`
          : value,
        [`memberInfo.${getOtherPrivateChatMember(
          chatData
        )}.isHidingChat`]: false,
      });
    } else {
      await updateDoc(chatDocRef, {
        lastActive: serverTimestamp(),
        lastMessage: newImageMessage
          ? `${user.displayName} sent an image`
          : value,
      });
    }
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
              <FilePickerIcon chatId={chatId} saveMessage={saveMessage} />
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
    </Box>
  );
};

export default ChatInput;

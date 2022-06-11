import SendGif from "./SendGif";
import SendEmoji from "./SendEmoji";
import SendImage from "./SendImage";
import SendMessage from "./SendMessage";
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
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const ChatInput = ({ chatData }) => {
  const { user } = useContext(UserContext);
  const [value, setValue] = useState("");

  const saveTextMessage = async () => {
    const chatRef = doc(db, "chats", chatData.id);
    const messagesRef = collection(chatRef, "messages");

    const newTextMessageRef = await addDoc(messagesRef, {
      messageText: value,
      sentAt: serverTimestamp(),
      sentBy: user.displayName,
      profilePicture: user.photoURL,
    });

    updateChat(newTextMessageRef);
  };

  const updateChat = async (newMessageRef) => {
    const chatRef = doc(db, "chats", chatData.id);
    const newMessage = await getDoc(newMessageRef);

    if (chatData.data.type === 1) {
      await updateDoc(chatRef, {
        lastActive: serverTimestamp(),
        lastMessage: newMessage.data().messageText
          ? value
          : `${user.displayName} sent an image`,
        [`memberInfo.${getOtherPrivateChatMember(
          chatData
        )}.isHidingChat`]: false,
      });
    } else {
      await updateDoc(chatRef, {
        lastActive: serverTimestamp(),
        lastMessage: newMessage.data().messageText
          ? value
          : `${user.displayName} sent an image`,
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
      saveTextMessage();
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
              <SendImage chatData={chatData} updateChat={updateChat} />
            </InputAdornment>
          ),

          endAdornment: (
            <InputAdornment position="end">
              <SendMessage handleKeyPress={handleKeyPress} />
              <SendGif chatData={chatData} updateChat={updateChat} />
              <SendEmoji value={value} setValue={setValue} />
            </InputAdornment>
          ),
        }}
      ></StyledTextField>
    </Box>
  );
};

export default ChatInput;

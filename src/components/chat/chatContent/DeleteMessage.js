import ClearIcon from "@mui/icons-material/Clear";
import { db } from "../../../firebase";
import { IconButton } from "@mui/material";
import { StyledDeleteBox } from "./ChatContent.styled";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

const DeleteMessage = ({ message, chatData }) => {
  const updateLastMessage = async (lastMessage) => {
    const chatRef = doc(db, "chats", chatData.id);

    await updateDoc(chatRef, {
      lastMessage: lastMessage,
    });
  };

  const getLastMessage = (lastMessageData) => {
    if (lastMessageData.messageText) {
      return lastMessageData.messageText;
    } else if (lastMessageData.imageURL || lastMessageData.videoURL) {
      return `${lastMessageData.sentBy} sent an image`;
    } else {
      return `Chat Created`;
    }
  };

  const getLastMessageData = (messagesSnap) => {
    if (messagesSnap.docs.length === 0) return `Chat Created`;
    return messagesSnap.docs[messagesSnap.docs.length - 1].data();
  };

  const getChatMessageData = async () => {
    const messagesRef = collection(db, "chats", chatData.id, "messages");
    const messagesQuery = query(messagesRef, orderBy("sentAt"));
    const messagesSnap = await getDocs(messagesQuery);

    const lastMessageData = getLastMessageData(messagesSnap);

    const lastMessage = getLastMessage(lastMessageData);

    updateLastMessage(lastMessage);
  };

  const deleteMessage = async () => {
    await deleteDoc(doc(db, "chats", chatData.id, "messages", message.id));

    getChatMessageData();
  };

  return (
    <StyledDeleteBox className="delete-icon">
      <IconButton onClick={() => deleteMessage(message)}>
        <ClearIcon color="primary" fontSize="small" />
      </IconButton>
    </StyledDeleteBox>
  );
};

export default DeleteMessage;

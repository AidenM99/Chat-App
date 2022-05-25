import ChatsData from "./ChatsData";
import { StyledChatsList } from "./styles";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";

const ChatsList = () => {
  const [chatsList, setChatsList] = useState([]);

  const loadChats = async () => {
    const chatsQuery = query(
      collection(db, "chats"),
      where(`members.${getAuth().currentUser.uid}.inChat`, "==", true)
    );

    onSnapshot(chatsQuery, (snapshot) => {
      const chats = [];

      snapshot.forEach((chat) => {
        chats.push({ id: chat.id, data: chat.data() });
      });

      setChatsList(chats);
    });
  };

  useEffect(() => {
    loadChats();
  }, []);

  return (
    <StyledChatsList>
      {chatsList.map((chatData, index) => (
        <ChatsData key={index} chatData={chatData} />
      ))}
    </StyledChatsList>
  );
};

export default ChatsList;

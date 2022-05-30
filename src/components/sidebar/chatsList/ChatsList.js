import ChatsData from "./ChatsData";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { StyledChatsList } from "./styles";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";

const ChatsList = () => {
  const [chatsList, setChatsList] = useState([]);

  const subscribeChats = () => {
    const chatsQuery = query(
      collection(db, "chats"),
      where(`members.${getAuth().currentUser.uid}.inChat`, "==", true)
    );

    return onSnapshot(chatsQuery, (snapshot) => {
      setChatsList(
        snapshot.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        })
      );
    });
  };

  useEffect(() => {
    const unsubscribeChats = subscribeChats();

    return () => {
      unsubscribeChats();
    };
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

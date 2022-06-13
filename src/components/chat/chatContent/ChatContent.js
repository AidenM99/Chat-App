import Message from "./Message";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { StyledChatContent } from "./ChatContent.styled";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const ChatContent = ({ chatData }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribeMessages = subscribeMessages();

    return () => {
      unsubscribeMessages();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatData.id]);

  const subscribeMessages = () => {
    const recentMessagesQuery = query(
      collection(db, "chats", chatData.id, "messages"),
      orderBy("sentAt", "desc"),
      limit(30)
    );

    return onSnapshot(recentMessagesQuery, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        })
      );
    });
  };

  return (
    <StyledChatContent>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </StyledChatContent>
  );
};

export default ChatContent;

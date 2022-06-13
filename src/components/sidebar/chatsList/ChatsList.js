import ChatsListItem from "./ChatsListItem";
import { db } from "../../../firebase";
import { useContext } from "react";
import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { UserContext } from "../../../hooks/UserContext";
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";

const ChatsList = () => {
  const { user } = useContext(UserContext);
  const [chatsList, setChatsList] = useState([]);

  const subscribeChats = () => {
    const chatsQuery = query(
      collection(db, "chats"),
      where("members", "array-contains", user.uid),
      orderBy("lastActive", "desc")
    );

    return onSnapshot(chatsQuery, (snapshot) => {
      setChatsList(
        snapshot.docs
          .filter((doc) => {
            if (doc.data().type === 1) {
              return doc.data().memberInfo[user.uid].isHidingChat === false;
            } else {
              return doc;
            }
          })
          .map((doc) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <List sx={{ overflow: "auto", flex: "1" }}>
      {chatsList.map((chatData) => (
        <ChatsListItem key={chatData.id} chatData={chatData} />
      ))}
    </List>
  );
};

export default ChatsList;

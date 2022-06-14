import { getAuth } from "firebase/auth";

export const getOtherPrivateChatMember = (chatData) => {
  return chatData.data.members.find((id) => id !== getAuth().currentUser.uid);
};

export const getLastChatMessage = (chatData) => {
  if (chatData.data.messageText) {
    return chatData.data.messageText;
  } else if (chatData.data.sentBy) {
    return `${chatData.data.sentBy} sent an image`;
  } else if (chatData.data.lastMessage) {
    return chatData.data.lastMessage.trim();
  } else {
    return "Chat Created";
  }
};

export const getThemePref = () => {
  return localStorage.getItem("theme");
};

import { getAuth } from "firebase/auth";

export const getOtherPrivateChatMember = (chatData) => {
  return chatData.members.find((id) => id !== getAuth().currentUser.uid);
};

export const getLastChatMessage = (chatData) => {
  if (chatData.messageText) {
    return chatData.messageText;
  } else if (chatData.sentBy) {
    return `${chatData.sentBy} sent an image`;
  } else if (chatData.lastMessage) {
    return chatData.lastMessage.trim();
  } else {
    return "Chat Created";
  }
};

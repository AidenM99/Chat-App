import { getAuth } from "firebase/auth";

export const getOtherPrivateChatMember = (chatData) => {
  return chatData.data.members.find((id) => id !== getAuth().currentUser.uid);
};

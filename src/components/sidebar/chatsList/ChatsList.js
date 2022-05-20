import ChatsData from "./ChatsData";
import { StyledChatsList } from "./styles";

const ChatsList = ({ chatsList }) => {
  return (
    <StyledChatsList>
      {chatsList.map((data) => (
        <ChatsData data={data} key={data.uid} />
      ))}
    </StyledChatsList>
  );
};

export default ChatsList;

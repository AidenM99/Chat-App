import ChatOptions from "./ChatOptions";
import RecipientInfo from "./RecipientInfo";
import { StyledContainer } from "./TopPanel.styled";

const TopPanel = ({ chatData }) => {
  return (
    <StyledContainer sx={{ px: 2, py: 1 }}>
      <RecipientInfo chatData={chatData} />
      <ChatOptions chatData={chatData} />
    </StyledContainer>
  );
};

export default TopPanel;

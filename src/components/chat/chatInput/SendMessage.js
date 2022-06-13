import { StyledIconButton, StyledMessageIcon } from "./ChatInput.styled";

const SendMessage = ({ handleKeyPress }) => {
  return (
    <StyledIconButton id="sendMessage" onClick={handleKeyPress}>
      <StyledMessageIcon color="light" />
    </StyledIconButton>
  );
};

export default SendMessage;

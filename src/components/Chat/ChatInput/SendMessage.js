import { StyledIconButton, StyledMessageIcon } from "./ChatInput.styled";

const SendMessage = ({ handleKeyPress }) => {
  return (
    <StyledIconButton
      aria-label="send-message"
      id="sendMessage"
      onClick={handleKeyPress}
    >
      <StyledMessageIcon color="light" />
    </StyledIconButton>
  );
};

export default SendMessage;

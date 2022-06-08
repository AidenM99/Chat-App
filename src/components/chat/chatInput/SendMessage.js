import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

const SendMessage = ({ handleKeyPress }) => {
  return (
    <IconButton id="sendMessage" onClick={handleKeyPress}>
      <SendIcon color="light"></SendIcon>
    </IconButton>
  );
};

export default SendMessage;

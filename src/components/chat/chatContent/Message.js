import { Avatar, Box, Typography } from "@mui/material";
import { StyledMessageContainer } from "./styles";

const Message = ({ message }) => {
  return (
    <StyledMessageContainer sx={{ p: 2 }}>
      <Box sx={{ mr: 1.5 }}>
        <Avatar alt="profile-picture" src={message.profilePicture}></Avatar>
      </Box>
      <Box display="flex" flexDirection="column" width="95%" sx={{ mt: -0.35 }}>
        <Typography>{message.sentBy}</Typography>
        <Typography>{message.messageText}</Typography>
      </Box>
    </StyledMessageContainer>
  );
};

export default Message;

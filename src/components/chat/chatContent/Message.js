import { Avatar, Box, Typography } from "@mui/material";
import { StyledMessageContainer, StyledImage } from "./styles";

const Message = ({ message }) => {
  return (
    <StyledMessageContainer sx={{ p: 2 }}>
      <Box sx={{ mr: 2 }}>
        <Avatar alt="profile-picture" src={message.profilePicture}></Avatar>
      </Box>
      <Box display="flex" flexDirection="column" width="95%" sx={{ mt: -0.35 }}>
        <Typography fontWeight="500">{message.sentBy}</Typography>
        {message.messageText ? (
          <Typography color="lowLight.main">{message.messageText}</Typography>
        ) : (
          <Box maxHeight="350px" maxWidth="350px">
            <StyledImage
              component="img"
              src={message.imageURL}
              alt="image"
            ></StyledImage>
          </Box>
        )}
      </Box>
    </StyledMessageContainer>
  );
};

export default Message;

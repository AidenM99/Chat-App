import { useContext } from "react";
import { UserContext } from "../../../hooks/Context";
import { Avatar, Box, Typography } from "@mui/material";
import {
  StyledMessageContainer,
  StyledImage,
  MediaContainer,
} from "./ChatContent.styled";
import DeleteMessage from "./DeleteMessage";

const Message = ({ message, chatData }) => {
  const { user } = useContext(UserContext);

  return (
    <StyledMessageContainer sx={{ p: 2 }}>
      <Box sx={{ mr: 2 }}>
        <Avatar
          alt="profile-picture"
          src={message.data.profilePicture}
        ></Avatar>
      </Box>
      <Box display="flex" flexDirection="column" width="95%" sx={{ mt: -0.35 }}>
        <Typography>{message.data.sentBy}</Typography>
        {message.data.messageText && (
          <Typography color="textSecondary.main">
            {message.data.messageText}
          </Typography>
        )}
        {message.data.imageURL && (
          <MediaContainer>
            <StyledImage
              component="img"
              src={message.data.imageURL}
              alt="image"
            ></StyledImage>
          </MediaContainer>
        )}
        {message.data.videoURL && (
          <MediaContainer>
            <video
              autoPlay
              loop
              muted
              playsInline
              src={message.data.videoURL}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </MediaContainer>
        )}
        {message.data.sentBy === user.displayName && (
          <DeleteMessage message={message} chatData={chatData} />
        )}
      </Box>
    </StyledMessageContainer>
  );
};

export default Message;

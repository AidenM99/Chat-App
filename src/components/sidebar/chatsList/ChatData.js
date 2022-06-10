import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import {
  getLastChatMessage,
  getOtherPrivateChatMember,
} from "../../../utils/utils";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const ChatData = ({ chatData }) => {
  const recipientId =
    chatData.data.type === 1 && getOtherPrivateChatMember(chatData);
  const recipientInfo =
    chatData.data.type === 1 && chatData.data.memberInfo[recipientId];
  const lastMessage = getLastChatMessage(chatData);

  return (
    <Link
      to={`/${chatData.id}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <ListItem button disablePadding sx={{ p: 1 }}>
        <ListItemAvatar>
          {chatData.data.type === 1 ? (
            <Avatar
              alt="profile-picture"
              src={recipientInfo.profilePicture}
            ></Avatar>
          ) : (
            <Avatar alt="group-icon" sx={{ bgcolor: "groupChat.main" }}>
              <GroupIcon />
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography fontWeight="500" noWrap={true}>
              {chatData.data.type === 1
                ? recipientInfo.displayName
                : chatData.data.groupName}
            </Typography>
          }
          secondary={
            <Typography
              color="lowLight.main"
              fontSize="0.85rem"
              noWrap={true}
              width="50%"
            >
              {lastMessage}
            </Typography>
          }
          primaryTypographyProps={{ noWrap: true }}
        ></ListItemText>
      </ListItem>
    </Link>
  );
};

export default ChatData;

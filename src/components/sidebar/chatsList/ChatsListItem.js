import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import { StyledListItemAvatar } from "./ChatsList.styled";
import {
  getLastChatMessage,
  getOtherPrivateChatMember,
} from "../../../utils/helpers";
import { Avatar, ListItem, ListItemText, Typography } from "@mui/material";

const ChatsListItem = ({ chatData }) => {
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
        <StyledListItemAvatar>
          {chatData.data.type === 1 ? (
            <Avatar
              alt="profile-picture"
              src={recipientInfo.profilePicture}
            ></Avatar>
          ) : (
            <Avatar alt="group-icon" sx={{ bgcolor: "groupChat.main" }}>
              <GroupIcon sx={{ color: "white" }} />
            </Avatar>
          )}
        </StyledListItemAvatar>
        <ListItemText
          primary={
            <Typography
              fontWeight="500"
              noWrap={true}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              {chatData.data.type === 1
                ? recipientInfo.displayName
                : chatData.data.groupName}
            </Typography>
          }
          secondary={
            <Typography
              color="textSecondary.main"
              fontSize="0.85rem"
              width="50%"
              noWrap={true}
              sx={{ display: { xs: "none", md: "block" } }}
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

export default ChatsListItem;

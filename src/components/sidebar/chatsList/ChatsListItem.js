import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import { Avatar, ListItem, ListItemText } from "@mui/material";
import {
  getLastChatMessage,
  getOtherPrivateChatMember,
} from "../../../utils/helpers";
import {
  StyledLastMessage,
  StyledListItemAvatar,
  StyledRecipientName,
} from "./ChatsList.styled";

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
              <GroupIcon />
            </Avatar>
          )}
        </StyledListItemAvatar>
        <ListItemText
          primary={
            <StyledRecipientName noWrap={true}>
              {chatData.data.type === 1
                ? recipientInfo.displayName
                : chatData.data.groupName}
            </StyledRecipientName>
          }
          secondary={
            <StyledLastMessage noWrap={true}>{lastMessage}</StyledLastMessage>
          }
          primaryTypographyProps={{ noWrap: true }}
        ></ListItemText>
      </ListItem>
    </Link>
  );
};

export default ChatsListItem;

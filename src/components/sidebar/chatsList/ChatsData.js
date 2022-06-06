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

const ChatsData = ({ chatData }) => {
  const recipientId = getOtherPrivateChatMember(chatData.data);

  const recipientInfo = chatData.data.memberInfo[recipientId];

  const lastMessage = getLastChatMessage(chatData.data);

  return (
    <Link
      to={`/${chatData.id}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <ListItem button disablePadding sx={{ p: 1 }}>
        <ListItemAvatar>
          <Avatar
            alt="profile-picture"
            src={recipientInfo.profilePicture}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography fontWeight="500" noWrap={true}>
              {recipientInfo.displayName}
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

export default ChatsData;

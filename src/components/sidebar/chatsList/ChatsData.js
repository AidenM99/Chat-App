import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const ChatsData = ({ chatData }) => {
  const userId = Object.keys(chatData.data.members).filter(
    (key) => key !== getAuth().currentUser.uid
  );

  const userInfo = chatData.data.members[userId];

  const lastMessage = chatData.data.lastMessage
    ? chatData.data.lastMessage.trim()
    : "Chat Created";

  return (
    <Link
      to={`/${chatData.id}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <ListItem button disablePadding sx={{ p: 1 }}>
        <ListItemAvatar>
          <Avatar alt="profile-picture" src={userInfo.profilePicture}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography fontWeight="500" noWrap={true}>
              {userInfo.displayName}
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

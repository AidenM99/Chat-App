import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

const ChatsData = ({ chatData }) => {
  const userId = Object.keys(chatData.data.members).filter(
    (key) => key !== getAuth().currentUser.uid
  );

  const userInfo = chatData.data.members[userId];

  return (
    <Link
      to={`/${chatData.id}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <ListItem button disablePadding sx={{ p: 1 }}>
        <ListItemAvatar>
          <Avatar alt="profile-picture" src={userInfo.profilePicture}></Avatar>
        </ListItemAvatar>
        <ListItemText primaryTypographyProps={{ noWrap: true }}>
          {userInfo.displayName}
        </ListItemText>
      </ListItem>
    </Link>
  );
};

export default ChatsData;

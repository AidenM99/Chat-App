import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const ChatsData = ({ data }) => {
  return (
    <ListItem button divider>
      <ListItemAvatar>
        <Avatar alt="profile-picture" src={data.photoURL}></Avatar>
      </ListItemAvatar>
      <ListItemText primaryTypographyProps={{ noWrap: true }}>
        {data.name}
      </ListItemText>
    </ListItem>
  );
};

export default ChatsData;

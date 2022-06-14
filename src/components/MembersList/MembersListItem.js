import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const MembersListItem = ({ member }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt="profile-picture" src={member.data.photoURL}></Avatar>
      </ListItemAvatar>
      <ListItemText primaryTypographyProps={{ noWrap: true }}>
        {member.data.displayName}
      </ListItemText>
    </ListItem>
  );
};

export default MembersListItem;

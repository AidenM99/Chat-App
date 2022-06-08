import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const MemberData = ({ member }) => {
  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar alt="profile-picture" src={member.photoURL}></Avatar>
      </ListItemAvatar>
      <ListItemText primaryTypographyProps={{ noWrap: true }}>
        {member.displayName}
      </ListItemText>
    </ListItem>
  );
};

export default MemberData;

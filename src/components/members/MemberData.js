import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const MemberData = ({ member }) => {
  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar alt="profile-picture" src={member.data.photoURL}></Avatar>
      </ListItemAvatar>
      <ListItemText primaryTypographyProps={{ noWrap: true }}>
        {member.data.displayName}
      </ListItemText>
    </ListItem>
  );
};

export default MemberData;

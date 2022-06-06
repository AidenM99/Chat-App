import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const UserData = ({ userData, userDataClickHandler }) => {
  return (
    <ListItem button divider onClick={() => userDataClickHandler(userData)}>
      <ListItemAvatar>
        <Avatar alt="profile-picture" src={userData.photoURL}></Avatar>
      </ListItemAvatar>
      <ListItemText primaryTypographyProps={{ noWrap: true }}>
        {userData.displayName}
      </ListItemText>
    </ListItem>
  );
};

export default UserData;

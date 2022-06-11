import { useState } from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const UsersListItem = ({ userData, userDataClickHandler }) => {
  const [active, setActive] = useState(false);

  const clickHandler = (userData) => {
    setActive(!active);

    userDataClickHandler(userData);
  };

  return (
    <ListItem
      button
      divider
      onClick={() => clickHandler(userData)}
      sx={{
        bgcolor: active && "secondary.main",
        "&:hover": { bgcolor: active && "secondary.main" },
      }}
    >
      <ListItemAvatar>
        <Avatar alt="profile-picture" src={userData.data.photoURL}></Avatar>
      </ListItemAvatar>
      <ListItemText primaryTypographyProps={{ noWrap: true }}>
        {userData.data.displayName}
      </ListItemText>
    </ListItem>
  );
};

export default UsersListItem;

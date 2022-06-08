import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useState } from "react";

const UserData = ({ userData, userDataClickHandler }) => {
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
        <Avatar alt="profile-picture" src={userData.photoURL}></Avatar>
      </ListItemAvatar>
      <ListItemText primaryTypographyProps={{ noWrap: true }}>
        {userData.displayName}
      </ListItemText>
    </ListItem>
  );
};

export default UserData;

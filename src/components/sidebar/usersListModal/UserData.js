import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const UserData = ({ data, setChatsList }) => {
  return (
    <ListItem
      button
      divider
      onClick={() => setChatsList((prevState) => [...prevState, data])}
    >
      <ListItemAvatar>
        <Avatar alt="profile-picture" src={data.photoURL}></Avatar>
      </ListItemAvatar>
      <ListItemText primaryTypographyProps={{ noWrap: true }}>
        {data.name}
      </ListItemText>
    </ListItem>
  );
};

export default UserData;

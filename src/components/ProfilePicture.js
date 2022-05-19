import { Box } from "@mui/material";

const profilePicture = ({ userDetails }) => {
  return (
    <Box height="50px" width="50px">
      <Box
        alt="profile-picture"
        borderRadius="50%"
        component="img"
        height="100%"
        src={userDetails.photoURL}
        referrerpolicy="no-referrer"
        width="100%"
      ></Box>
    </Box>
  );
};

export default profilePicture;

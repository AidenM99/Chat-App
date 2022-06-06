import { Avatar, Box, Typography } from "@mui/material";
import { getOtherPrivateChatMember } from "../../../utils/utils";

const RecipientInfo = ({ chatData }) => {
  const recipientId = getOtherPrivateChatMember(chatData);

  const recipientInfo = chatData.memberInfo[recipientId];

  return (
    <Box alignItems="center" display="flex">
      <Avatar
        alt="profile-picture"
        src={recipientInfo.profilePicture}
        sx={{ mr: 2 }}
      />
      <Typography fontWeight="500">{recipientInfo.displayName}</Typography>
    </Box>
  );
};

export default RecipientInfo;

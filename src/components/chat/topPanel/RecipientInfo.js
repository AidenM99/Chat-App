import GroupIcon from "@mui/icons-material/Group";
import { Avatar, Box, Typography } from "@mui/material";
import { getOtherPrivateChatMember } from "../../../utils/utils";

const RecipientInfo = ({ chatData }) => {
  const recipientId =
    chatData.type === 1 && getOtherPrivateChatMember(chatData);
  const recipientInfo = chatData.type === 1 && chatData.memberInfo[recipientId];

  return (
    <Box alignItems="center" display="flex">
      {chatData.type === 1 ? (
        <Avatar
          alt="profile-picture"
          src={recipientInfo.profilePicture}
          sx={{ mr: 2 }}
        />
      ) : (
        <Avatar alt="group-icon" sx={{ bgcolor: "groupChat.main", mr: 2 }}>
          <GroupIcon />
        </Avatar>
      )}
      <Typography fontWeight="500">
        {chatData.type === 1 ? recipientInfo.displayName : chatData.groupName}
      </Typography>
    </Box>
  );
};

export default RecipientInfo;

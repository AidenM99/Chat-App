import GroupIcon from "@mui/icons-material/Group";
import { Avatar, Box } from "@mui/material";
import { StyledTypography } from "./TopPanel.styled";
import { getOtherPrivateChatMember } from "../../../utils/helpers";

const RecipientInfo = ({ chatData }) => {
  const recipientId =
    chatData.data.type === 1 && getOtherPrivateChatMember(chatData);
  const recipientInfo =
    chatData.data.type === 1 && chatData.data.memberInfo[recipientId];

  return (
    <Box alignItems="center" display="flex">
      {chatData.data.type === 1 ? (
        <Avatar
          alt="profile-picture"
          src={recipientInfo.profilePicture}
          sx={{ mr: 2 }}
        />
      ) : (
        <Avatar
          alt="group-icon"
          sx={{ color: "#fff", bgcolor: "groupChat.main", mr: 2 }}
        >
          <GroupIcon />
        </Avatar>
      )}
      <StyledTypography noWrap={true}>
        {chatData.data.type === 1
          ? recipientInfo.displayName
          : chatData.data.groupName}
      </StyledTypography>
    </Box>
  );
};

export default RecipientInfo;

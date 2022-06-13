import LogOut from "./LogOut";
import CreateChat from "./CreateChat";
import ProfilePicture from "./ProfilePicture";
import { Box } from "@mui/material";
import {
  StyledContainer,
  StyledIconBox,
  StyledTypography,
} from "./TopPanel.styled";

const TopPanel = () => {
  return (
    <StyledContainer>
      <Box display="flex" alignItems="center">
        <ProfilePicture />
        <StyledTypography>Your Chats</StyledTypography>
      </Box>
      <StyledIconBox>
        <CreateChat />
        <LogOut />
      </StyledIconBox>
    </StyledContainer>
  );
};

export default TopPanel;

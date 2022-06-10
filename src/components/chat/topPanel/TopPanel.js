import ChatOptions from "./ChatOptions";
import RecipientInfo from "./RecipientInfo";
import { Box } from "@mui/material";

const TopPanel = ({ chatData }) => {
  return (
    <Box
      alignItems="center"
      borderBottom="1px solid rgba(255, 255, 255, 0.15)"
      display="flex"
      justifyContent="space-between"
      height="57px"
      width="100%"
      sx={{ px: 2, py: 1 }}
    >
      <RecipientInfo chatData={chatData} />
      <ChatOptions chatData={chatData} />
    </Box>
  );
};

export default TopPanel;

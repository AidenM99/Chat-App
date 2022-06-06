import RecipientInfo from "./RecipientInfo";
import { Box } from "@mui/material";
import ChatOptions from "./ChatOptions";

const TopPanel = ({ chatId, chatData }) => {
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
      <ChatOptions chatId={chatId} />
    </Box>
  );
};

export default TopPanel;

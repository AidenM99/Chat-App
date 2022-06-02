import RecipientInfo from "./RecipientInfo";
import { Box } from "@mui/material";

const TopPanel = ({ chatId, chatData }) => {
  return (
    <Box
      borderBottom="1px solid rgba(255, 255, 255, 0.15)"
      height="57px"
      width="100%"
      sx={{ px: 2, py: 1 }}
    >
      <RecipientInfo chatId={chatId} chatData={chatData} />
    </Box>
  );
};

export default TopPanel;

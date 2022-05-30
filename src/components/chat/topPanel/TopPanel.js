import RecipientInfo from "./RecipientInfo";
import { Box } from "@mui/material";

const TopPanel = ({ chatData }) => {
  return (
    <Box
      borderBottom="1px solid rgba(255, 255, 255, 0.15)"
      height="57px"
      width="100%"
      sx={{ p: 1 }}
    >
      <RecipientInfo chatData={chatData} />
    </Box>
  );
};

export default TopPanel;

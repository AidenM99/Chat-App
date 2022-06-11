import TopPanel from "./TopPanel/TopPanel";
import ChatsList from "./ChatsList/ChatsList.js";
import { Box } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      backgroundColor="bgSecondary.main"
      borderRight="1px solid rgba(255, 255, 255, 0.15)"
      display="flex"
      flexDirection="column"
      height="100vh"
      width="18.75rem"
    >
      <TopPanel />
      <ChatsList />
    </Box>
  );
};

export default Sidebar;

import Chat from "../components/Chat/Chat";
import Sidebar from "../components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box
      backgroundColor="bgPrimary.main"
      display="flex"
      height="100vh"
      width="100vw"
    >
      <Routes>
        <Route path={"/"} element={<Sidebar />} />
        <Route
          path={"/:chatId"}
          element={
            <>
              <Sidebar />
              <Chat />
            </>
          }
        />
      </Routes>
    </Box>
  );
};

export default Dashboard;

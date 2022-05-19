import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { Box } from "@mui/material";
import { getAuth } from "firebase/auth";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(getAuth().currentUser);

  return (
    <Box
      alignItems="center"
      backgroundColor="bgPrimary.main"
      display="flex"
      height="100vh"
      width="100vw"
    >
      <Sidebar userDetails={userDetails} />
      <Box flex="1" height="100vh"></Box>
    </Box>
  );
};

export default Dashboard;

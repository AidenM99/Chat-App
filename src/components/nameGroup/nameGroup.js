import { StyledTextField } from "./styles";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import GroupChatNameAlert from "../alerts/GroupChatNameAlert";

const NameGroup = ({ addNewGroupChat }) => {
  const [alertActive, setAlertActive] = useState(false);
  const [groupName, setGroupName] = useState("");

  const handleValueChange = (e) => {
    setGroupName(e.target.value);
  };

  const openAlert = () => {
    setAlertActive(true);
  };

  const checkValue = (groupName) => {
    if (groupName.length > 0) {
      addNewGroupChat(groupName);
      return;
    }
    openAlert();
  };

  useEffect(() => {
    return () => {
      setGroupName("");
    };
  }, []);

  return (
    <Box
      backgroundColor="bgSecondary.main"
      border="2px solid rgba(255, 255, 255, 0.15)"
      left="50%"
      position="absolute"
      top="50%"
      sx={{
        py: 3.5,
        px: 5,
        boxShadow: 24,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography
        id="modal-modal-title"
        variant="h6"
        textAlign="center"
        sx={{ mb: 3.5 }}
      >
        Name Your Group
      </Typography>
      <StyledTextField
        fullWidth
        color="secondary"
        inputProps={{ maxLength: 20 }}
        onChange={(e) => handleValueChange(e)}
      ></StyledTextField>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 3.5 }}
        onClick={() => checkValue(groupName)}
      >
        Create Group
      </Button>
      <GroupChatNameAlert
        alertActive={alertActive}
        setAlertActive={setAlertActive}
      />
    </Box>
  );
};

export default NameGroup;

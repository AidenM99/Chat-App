import NameGroupAlert from "./NameGroupAlert";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { StyledContainer, StyledTextField } from "./NameGroup.styled";

const NameGroupModal = ({ addNewGroupChat }) => {
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
    <StyledContainer sx={{ boxShadow: 24 }}>
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
      <NameGroupAlert
        alertActive={alertActive}
        setAlertActive={setAlertActive}
      />
    </StyledContainer>
  );
};

export default NameGroupModal;

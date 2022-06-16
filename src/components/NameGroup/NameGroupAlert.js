import { Alert, Snackbar } from "@mui/material";

const NameGroupAlert = ({ alertActive, setAlertActive }) => {
  const closeAlert = () => {
    setAlertActive(false);
  };

  return (
    <Snackbar
      open={alertActive}
      onClose={closeAlert}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert severity="error">Group chat names cannot be empty!</Alert>
    </Snackbar>
  );
};

export default NameGroupAlert;

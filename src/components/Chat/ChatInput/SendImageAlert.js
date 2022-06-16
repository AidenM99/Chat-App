import { Alert, Snackbar } from "@mui/material";

const SendImageAlert = ({ alertActive, setAlertActive }) => {
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
      <Alert severity="error">You can only share images!</Alert>
    </Snackbar>
  );
};

export default SendImageAlert;

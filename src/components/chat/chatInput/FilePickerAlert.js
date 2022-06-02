import { Alert, Snackbar } from "@mui/material";

const FilePickerAlert = ({ snackbarActive, setSnackbarActive }) => {
  const closeSnackbar = () => {
    setSnackbarActive(false);
  };

  return (
    <Snackbar
      open={snackbarActive}
      onClose={closeSnackbar}
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

export default FilePickerAlert;

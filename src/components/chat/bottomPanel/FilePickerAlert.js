import { Alert, Snackbar } from "@mui/material";

const FilePickerAlert = ({ snackbarOpen, setSnackbarOpen }) => {
  return (
    <Snackbar
      open={snackbarOpen}
      onClose={() => setSnackbarOpen(false)}
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

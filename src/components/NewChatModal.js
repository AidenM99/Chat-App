import { Box, Modal, Typography } from "@mui/material";

const NewChatModal = ({ open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "bgSecondary.main",
    border: "2px solid #000",
    boxShadow: 24,
    p: 5,
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            New Chat
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default NewChatModal;

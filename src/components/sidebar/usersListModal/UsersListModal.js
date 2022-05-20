import UserData from "./UserData";
import { getAuth } from "firebase/auth";
import { StyledUsersList } from "./styles";
import { Box, Modal, Typography } from "@mui/material";

const UsersListModal = ({ open, usersList, setChatsList, handleClose }) => {
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          backgroundColor="bgSecondary.main"
          border="2px solid rgba(255, 255, 255, 0.15)"
          left="50%"
          position="absolute"
          top="50%"
          sx={{
            p: "0.5rem",
            boxShadow: 24,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            textAlign="center"
            sx={{ mt: "0.5rem", mb: "1rem" }}
          >
            Create New Chat
          </Typography>
          <StyledUsersList dense>
            {usersList.map((data) =>
              data.uid === getAuth().currentUser.uid ? null : (
                <UserData
                  data={data}
                  key={data.uid}
                  setChatsList={setChatsList}
                />
              )
            )}
          </StyledUsersList>
        </Box>
      </Modal>
    </Box>
  );
};

export default UsersListModal;

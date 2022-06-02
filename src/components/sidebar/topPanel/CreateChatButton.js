import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton } from "@mui/material";

const CreateChat = ({ openModal }) => {
  return (
    <Box>
      <IconButton onClick={openModal}>
        <AddIcon color="light" fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default CreateChat;

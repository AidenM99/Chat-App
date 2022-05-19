import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton } from "@mui/material";

const CreateChat = ({ handleOpen }) => {
  return (
    <Box>
      <IconButton onClick={() => handleOpen()}>
        <AddIcon color="light" />
      </IconButton>
    </Box>
  );
};

export default CreateChat;

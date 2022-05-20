import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton } from "@mui/material";

const CreateChat = ({ handleOpen }) => {
  return (
    <Box>
      <IconButton onClick={() => handleOpen()}>
        <AddIcon color="light" fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default CreateChat;

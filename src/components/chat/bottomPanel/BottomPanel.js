import ChatInput from "./ChatInput";
import EmojiSelect from "./EmojiPicker";
import FilePickerAlert from "./FilePickerAlert";
import { useState } from "react";
import { Box } from "@mui/material";

const BottomPanel = ({ chatId }) => {
  const [value, setValue] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setValue(value + emojiObject.emoji);
  };

  return (
    <Box sx={{ p: 3 }}>
      <ChatInput
        value={value}
        chatId={chatId}
        setValue={setValue}
        setAnchorEl={setAnchorEl}
        setSnackbarOpen={setSnackbarOpen}
      />
      <EmojiSelect
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        onEmojiClick={onEmojiClick}
      />
      <FilePickerAlert
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </Box>
  );
};

export default BottomPanel;

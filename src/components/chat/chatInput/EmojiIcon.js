import "emoji-mart/css/emoji-mart.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useState } from "react";
import { Picker } from "emoji-mart";
import { Popover } from "@mui/material";
import { Box, IconButton } from "@mui/material";

const EmojiIcon = ({ value, setValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const onEmojiClick = (emoji) => {
    setValue(value + emoji.native);

    setAnchorEl(null);
  };

  const openEmojiPicker = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeEmojiPicker = () => {
    setAnchorEl(null);
  };

  const matches = useMediaQuery("(max-width:900px)");

  return (
    <Box>
      <IconButton onClick={openEmojiPicker}>
        <EmojiEmotionsIcon color="light"></EmojiEmotionsIcon>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeEmojiPicker}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Picker
          onSelect={onEmojiClick}
          theme="dark"
          color="#5865F2"
          emojiSize={matches ? 18 : 30}
        />
      </Popover>
    </Box>
  );
};

export default EmojiIcon;

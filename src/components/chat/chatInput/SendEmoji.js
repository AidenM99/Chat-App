import "emoji-mart/css/emoji-mart.css";
import { useState } from "react";
import { Picker } from "emoji-mart";
import { Box, Popover, useMediaQuery } from "@mui/material";
import { StyledEmojiIcon, StyledIconButton } from "./ChatInput.styled";

const SendEmoji = ({ value, setValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const matches = useMediaQuery("(max-width: 600px)");

  const onEmojiClick = (emoji) => {
    setValue(value + emoji.native);
  };

  const openEmojiPicker = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeEmojiPicker = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <StyledIconButton
        onClick={openEmojiPicker}
        sx={{ display: matches ? "none" : "inline-flex" }}
      >
        <StyledEmojiIcon></StyledEmojiIcon>
      </StyledIconButton>
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
          set="twitter"
          color="#5865F2"
          emojiSize={20}
        />
      </Popover>
    </Box>
  );
};

export default SendEmoji;

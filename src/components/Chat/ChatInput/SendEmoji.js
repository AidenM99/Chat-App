import "emoji-mart/css/emoji-mart.css";
import { useState } from "react";
import { Picker } from "emoji-mart";
import { Box, Popover } from "@mui/material";
import { getThemePref } from "../../../theme/theme";
import { StyledEmojiIcon, StyledIconButton } from "./ChatInput.styled";

const SendEmoji = ({ value, setValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const onEmojiClick = (emoji) => {
    closeEmojiPicker();

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
        aria-label="emoji-select"
        onClick={openEmojiPicker}
        sx={{ display: { xs: "none", sm: "inline-flex" } }}
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
          theme={getThemePref()}
          set="twitter"
          color="#5865F2"
          emojiSize={30}
        />
      </Popover>
    </Box>
  );
};

export default SendEmoji;

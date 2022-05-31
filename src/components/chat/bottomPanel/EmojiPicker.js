import EmojiPicker from "emoji-picker-react";
import { Popover } from "@mui/material";

const EmojiSelect = ({ anchorEl, setAnchorEl, onEmojiClick }) => {
  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      keepMounted
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <EmojiPicker
        onEmojiClick={(event, emojiObject) => onEmojiClick(event, emojiObject)}
      />
    </Popover>
  );
};

export default EmojiSelect;

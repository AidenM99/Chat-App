import { List, styled } from "@mui/material";

export const StyledChatsList = styled(List)(({ theme }) => ({
  overflow: "auto",
  flex: "1",
  "&::-webkit-scrollbar": {
    width: "14px",
  },
  "&::-webkit-scrollbar-track": {
    display: "none",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.secondary.main,
    backgroundClip: "padding-box",
    border: "4px solid transparent",
    borderRadius: "9999px",
  },
}));

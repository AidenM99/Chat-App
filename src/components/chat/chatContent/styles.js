import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledChatContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  flex: "1",
  overflowWrap: "anywhere",
  overflowX: "hidden",
  overflowY: "auto",
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

export const StyledMessageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  whiteSpace: "pre-line",
  "&:hover": {
    backgroundColor: theme.palette.bgSecondary.main,
  },
}));

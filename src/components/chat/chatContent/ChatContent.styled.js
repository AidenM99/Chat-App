import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledChatContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  flex: "1",
  overflowX: "hidden",
  overflowY: "auto",
}));

export const StyledMessageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  whiteSpace: "pre-line",
  position: "relative",
  wordBreak: "break-word",
  overflowWrap: "anywhere",
  "&:hover": {
    backgroundColor: theme.palette.bgSecondary.main,
  },
  "&:hover .delete-icon, &active .delete-icon": {
    display: "inline-block",
  },
}));

export const StyledImage = styled(Box)(() => ({
  height: "auto",
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "contain",
}));

export const MediaContainer = styled(Box)(() => ({
  maxHeight: "350px",
  maxWidth: "350px",
}));

export const StyledDeleteBox = styled(Box)(() => ({
  display: "none",
  position: "absolute",
  right: "5px",
  top: "5px",
}));

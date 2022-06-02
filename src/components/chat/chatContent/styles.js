import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledChatContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  flex: "1",
  overflowWrap: "anywhere",
  overflowX: "hidden",
  overflowY: "auto",
}));

export const StyledMessageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  whiteSpace: "pre-line",
  "&:hover": {
    backgroundColor: theme.palette.bgSecondary.main,
  },
}));

export const StyledImage = styled(Box)(() => ({
  height: "auto",
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "contain",
}));

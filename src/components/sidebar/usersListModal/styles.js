import { List, styled } from "@mui/material";

export const StyledUsersList = styled(List)(({ theme }) => ({
  height: "200px",
  overflow: "auto",
  width: "275px",
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

import { TextField, styled } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  textarea: {
    color: theme.palette.light.main,
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
  },
}));

import { TextField, styled } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  textarea: {
    color: theme.palette.light.main,
  },
}));

import { TextField, styled } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  input: {
    color: theme.palette.light.main,
  },
}));

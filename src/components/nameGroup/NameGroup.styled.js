import { TextField, styled, Box } from "@mui/material";

export const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.bgSecondary.main,
  border: "2px solid " + theme.palette.divider.main,
  left: "50%",
  padding: "1.75rem 2.5rem",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "350px",
  "@media (max-width: 367px)": {
    minWidth: "200px",
    width: "95%",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  input: {
    color: theme.palette.primary.main,
  },
}));

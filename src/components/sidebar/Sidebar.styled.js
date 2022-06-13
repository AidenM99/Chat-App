import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.bgSecondary.main,
  borderRight: "1px solid rgba(255, 255, 255, 0.15)",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "18.75rem",
  [theme.breakpoints.down("md")]: {
    width: "auto",
    padding: "0.5rem",
  },
}));

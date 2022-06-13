import styled from "@emotion/styled";
import { Avatar, Box, Menu, Typography } from "@mui/material";

export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.bgPrimary.main,
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "500",
  marginLeft: "1rem",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const StyledContainer = styled(Box)(({ theme }) => ({
  alignItems: "center",
  borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const StyledIconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginBottom: "8px",
  },
}));

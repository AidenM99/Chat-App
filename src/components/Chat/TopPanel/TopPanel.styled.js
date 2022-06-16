import styled from "@emotion/styled";
import { Box, Menu, Typography } from "@mui/material";

export const StyledContainer = styled(Box)(({ theme }) => ({
  alignItems: "center",
  borderBottom: "1px solid " + theme.palette.divider.main,
  display: "flex",
  justifyContent: "space-between",
  height: "57px",
  width: "100%",
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.bgPrimary.main,
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "500",
  maxWidth: "400px",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "200px",
  },
  "@media (max-width: 425px)": {
    width: "100px",
  },
}));

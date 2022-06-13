import styled from "@emotion/styled";
import { Menu, Typography } from "@mui/material";

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

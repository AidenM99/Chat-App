import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.bgPrimary.main,
  },
}));

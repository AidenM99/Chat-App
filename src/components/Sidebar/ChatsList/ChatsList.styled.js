import styled from "@emotion/styled";
import { List, ListItemAvatar } from "@mui/material";

export const StyledListItemAvatar = styled(ListItemAvatar)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 0,
  },
}));

export const StyledList = styled(List)(({ theme }) => ({
  flex: "1",
  overflow: "auto",
}));

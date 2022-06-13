import styled from "@emotion/styled";
import { ListItemAvatar, Typography } from "@mui/material";

export const StyledRecipientName = styled(Typography)(({ theme }) => ({
  fontWeight: "500",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const StyledLastMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.lowLight.main,
  fontSize: "0.85rem",
  width: "50%",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const StyledListItemAvatar = styled(ListItemAvatar)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 0,
  },
}));

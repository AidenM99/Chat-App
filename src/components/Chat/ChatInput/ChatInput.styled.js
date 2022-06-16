import SendIcon from "@mui/icons-material/Send";
import GifBoxIcon from "@mui/icons-material/GifBox";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { TextField, styled, IconButton, Box } from "@mui/material";

export const StyledTextArea = styled(TextField)(({ theme }) => ({
  textarea: {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("md")]: {
    "& .MuiInputBase-multiline": {
      padding: "12.5px 10.5px",
    },
  },
}));

export const StyledEmojiIcon = styled(EmojiEmotionsIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "1.5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
  },
}));

export const StyledGifIcon = styled(GifBoxIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "1.5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
  },
}));

export const StyledImageIcon = styled(AddCircleIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "1.5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
  },
}));

export const StyledMessageIcon = styled(SendIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "1.5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: "0.5rem",
  [theme.breakpoints.down("md")]: {
    padding: "0.25rem",
  },
}));

export const StyledGifsBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.bgSecondary.main,
  height: "426px",
  width: "406px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "316px",
  },
  "@media (max-width: 350px)": {
    width: "100%",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    "& .MuiInputBase-root": {
      paddingRight: "10.5px",
    },
    "& .MuiInputBase-input": {
      padding: "12.5px 10.5px",
    },
  },
}));

export const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "1.5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
  },
}));

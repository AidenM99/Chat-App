import Masonry from "react-masonry-css";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { db } from "../../../firebase";
import { UserContext } from "../../../hooks/UserContext";
import { useContext, useEffect, useState } from "react";
import { Box, InputAdornment, Popover } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import {
  StyledGifIcon,
  StyledGifsBox,
  StyledIconButton,
  StyledSearchIcon,
  StyledTextField,
} from "./ChatInput.styled";

const SendGif = ({ chatData, updateChat }) => {
  const { user } = useContext(UserContext);
  const [gifs, setGifs] = useState([]);
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const openGiphy = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeGiphy = () => {
    setAnchorEl(null);
  };

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchGifs();
  };

  const handleRequest = () => {
    if (value.length === 0) {
      return `https://api.giphy.com/v1/gifs/trending?api_key=0S9u3jHSSknnKxtv7ik5NX3bAi0SZgEx&limit=20`;
    }

    return `https://api.giphy.com/v1/gifs/search?api_key=0S9u3jHSSknnKxtv7ik5NX3bAi0SZgEx&q=${value}&limit=20`;
  };

  const searchGifs = async () => {
    const response = await fetch(handleRequest(), { mode: "cors" });

    const gifs = await response.json();

    setGifs(gifs.data);
  };

  const saveGifMessage = async (gif) => {
    closeGiphy();

    const chatRef = doc(db, "chats", chatData.id);

    const messagesRef = collection(chatRef, "messages");

    const newGifMessageRef = await addDoc(messagesRef, {
      videoURL: gif.images.original_mp4.mp4,
      sentAt: serverTimestamp(),
      sentBy: user.displayName,
      profilePicture: user.photoURL,
    });

    updateChat(newGifMessageRef);
  };

  useEffect(() => {
    searchGifs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <StyledIconButton aria-label="gif-select" onClick={openGiphy}>
        <StyledGifIcon color="light" />
      </StyledIconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeGiphy}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <StyledGifsBox>
          <Box sx={{ p: 1 }}>
            <StyledTextField
              color="secondary"
              fullWidth
              value={value}
              onChange={changeValue}
              onKeyPress={handleKeyPress}
              error={gifs.length === 0 ? true : false}
              helperText={
                gifs.length === 0
                  ? "Your search didn't match any results!"
                  : null
              }
              sx={{ input: { color: "light.main" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <StyledIconButton onClick={searchGifs}>
                      <StyledSearchIcon color="light" />
                    </StyledIconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {gifs.length === 0 ? (
            <Box
              display="flex"
              flex="1"
              alignItems="center"
              justifyContent="center"
              sx={{ transform: "translateY(-50px)" }}
            >
              <SearchOffIcon color="light" sx={{ fontSize: 75 }} />
            </Box>
          ) : (
            <Masonry
              breakpointCols={2}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid-column"
              style={{
                height: "100%",
                overflowY: "auto",
              }}
            >
              {gifs.map((gif) => (
                <img
                  key={gif.id}
                  src={gif.images.preview_webp.url}
                  alt="gif"
                  onClick={() => saveGifMessage(gif)}
                />
              ))}
            </Masonry>
          )}
        </StyledGifsBox>
      </Popover>
    </Box>
  );
};

export default SendGif;

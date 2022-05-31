import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useRef } from "react";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { StyledTextField } from "./styles";
import { Box, IconButton, InputAdornment } from "@mui/material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const ChatInput = ({
  value,
  chatId,
  setValue,
  setAnchorEl,
  setSnackbarOpen,
}) => {
  const fileInput = useRef(null);

  const handleKeyPress = (e) => {
    if (
      (e.charCode === 13 || e.currentTarget.id === "sendMessage") &&
      !e.shiftKey &&
      value.trim() !== ""
    ) {
      saveMessage();

      setValue("");

      e.preventDefault();
    }
  };

  const getLastMessage = (messageSnap) => {
    if (messageSnap.data().messageText) return messageSnap.data().messageText;
    return `${messageSnap.data().sentBy} sent an image`;
  };

  const updateLastMessage = async (chatsDocRef, chatsColRef, newMessage) => {
    const messageRef = doc(chatsColRef, newMessage.id);

    const messageSnap = await getDoc(messageRef);

    await updateDoc(chatsDocRef, {
      lastMessage: getLastMessage(messageSnap),
    });
  };

  const saveMessage = async () => {
    const chatsDocRef = doc(db, "chats", chatId);

    const chatsColRef = collection(chatsDocRef, "messages");

    const newMessage = await addDoc(chatsColRef, {
      messageText: value,
      sentAt: serverTimestamp(),
      sentBy: getAuth().currentUser.displayName,
      profilePicture: getAuth().currentUser.photoURL,
    });

    updateLastMessage(chatsDocRef, chatsColRef, newMessage);
  };

  const saveImageMessage = async (file) => {
    try {
      const chatsDocRef = doc(db, "chats", chatId);

      const chatsColRef = collection(chatsDocRef, "messages");

      // Add a temporary image in the firestore database that will be updated later
      const newMessage = await addDoc(chatsColRef, {
        imageURL: "https://www.google.com/images/spin-32.gif?a",
        sentAt: serverTimestamp(),
        sentBy: getAuth().currentUser.displayName,
        profilePicture: getAuth().currentUser.photoURL,
      });

      updateLastMessage(chatsDocRef, chatsColRef, newMessage);

      // Add the image to cloud storage
      const filePath = `${getAuth().currentUser.uid}/${newMessage.id}/${
        file.name
      }`;
      const newImageRef = ref(getStorage(), filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, file);

      // Generate a public URL that the temporary image in firestore will be updated with
      const publicImageUrl = await getDownloadURL(newImageRef);

      // Update the temporary image URL with the generated public image URL
      await updateDoc(newMessage, {
        imageURL: publicImageUrl,
        storageUri: fileSnapshot.metadata.fullPath,
      });
    } catch (error) {
      console.error(
        "There was an error uploading a file to Cloud Storage:",
        error
      );
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.match("image.*")) {
      setSnackbarOpen(true);
    }

    saveImageMessage(file);
  };

  return (
    <Box>
      <StyledTextField
        color="secondary"
        fullWidth
        maxRows={5}
        multiline
        value={value}
        inputProps={{
          maxLength: 1500,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={() => fileInput.current.click()}>
                <AddCircleIcon color="light"></AddCircleIcon>
              </IconButton>
            </InputAdornment>
          ),

          endAdornment: (
            <InputAdornment position="end">
              <IconButton id="sendMessage" onClick={(e) => handleKeyPress(e)}>
                <SendIcon color="light"></SendIcon>
              </IconButton>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <EmojiEmotionsIcon color="light"></EmojiEmotionsIcon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyPress={(e) => handleKeyPress(e)}
        onChange={(e) => setValue(e.target.value)}
      ></StyledTextField>
      <input
        ref={fileInput}
        type="file"
        onChange={(e) => handleChangeFile(e)}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default ChatInput;

import Resizer from "react-image-file-resizer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRef } from "react";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { IconButton } from "@mui/material";
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
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const FilePickerIcon = ({ chatId, saveMessage, setAlertActive }) => {
  const fileInput = useRef(null);

  const saveImageMessage = async (image) => {
    try {
      const chatDocRef = doc(db, "chats", chatId);

      const messagesRef = collection(chatDocRef, "messages");

      // Add a temporary image in the firestore database that will be updated later
      const newImageMessageRef = await addDoc(messagesRef, {
        imageURL: "https://www.google.com/images/spin-32.gif?a",
        sentAt: serverTimestamp(),
        sentBy: getAuth().currentUser.displayName,
        profilePicture: getAuth().currentUser.photoURL,
      });

      // Add the image to cloud storage
      const filePath = `${getAuth().currentUser.uid}/${chatId}/${
        newImageMessageRef.id
      }`;
      const newImageRef = ref(getStorage(), filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, image);

      // Generate a public URL that the temporary image in firestore will be updated with
      const publicImageUrl = await getDownloadURL(newImageRef);

      // Update the temporary image URL with the generated public image URL
      await updateDoc(newImageMessageRef, {
        imageURL: publicImageUrl,
        storageUri: fileSnapshot.metadata.fullPath,
      });

      saveMessage(newImageMessageRef);
    } catch (error) {
      console.error(
        "There was an error uploading a file to Cloud Storage:",
        error
      );
    }
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        350,
        350,
        "WEBP",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const handleChangeFile = async (e) => {
    const file = e.target.files[0];

    if (!file.type.match("image.*")) {
      openAlert();

      return;
    }

    if (!file) return;

    const image = await resizeFile(file);

    saveImageMessage(image);
  };

  const openAlert = () => {
    setAlertActive(true);
  };
  return (
    <>
      <IconButton onClick={() => fileInput.current.click()}>
        <AddCircleIcon color="light"></AddCircleIcon>
      </IconButton>
      <input
        ref={fileInput}
        type="file"
        onChange={handleChangeFile}
        style={{ display: "none" }}
      />
    </>
  );
};

export default FilePickerIcon;

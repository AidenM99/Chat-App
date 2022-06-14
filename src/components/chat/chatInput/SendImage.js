import Resizer from "react-image-file-resizer";
import SendImageAlert from "./SendImageAlert";
import { useContext } from "react";
import { db } from "../../../firebase";
import { useRef, useState } from "react";
import { UserContext } from "../../../hooks/Context";
import { StyledIconButton, StyledImageIcon } from "./ChatInput.styled";
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

const SendImage = ({ chatData, updateChat }) => {
  const { user } = useContext(UserContext);
  const fileInput = useRef(null);
  const [alertActive, setAlertActive] = useState(false);

  const saveImageMessage = async (image) => {
    try {
      const chatDocRef = doc(db, "chats", chatData.id);

      const messagesRef = collection(chatDocRef, "messages");

      // Add a temporary image in the firestore database that will be updated later
      const newImageMessageRef = await addDoc(messagesRef, {
        imageURL: "https://www.google.com/images/spin-32.gif?a",
        sentAt: serverTimestamp(),
        sentBy: user.displayName,
        profilePicture: user.photoURL,
      });

      // Add the image to cloud storage
      const filePath = `${user.uid}/${chatData.id}/${newImageMessageRef.id}`;
      const newImageRef = ref(getStorage(), filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, image);

      // Generate a public URL that the temporary image in firestore will be updated with
      const publicImageUrl = await getDownloadURL(newImageRef);

      // Update the temporary image URL with the generated public image URL
      await updateDoc(newImageMessageRef, {
        imageURL: publicImageUrl,
        storageUri: fileSnapshot.metadata.fullPath,
      });

      updateChat(newImageMessageRef);
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
      <StyledIconButton
        aria-label="image-select"
        onClick={() => fileInput.current.click()}
      >
        <StyledImageIcon color="light" />
      </StyledIconButton>
      <SendImageAlert
        alertActive={alertActive}
        setAlertActive={setAlertActive}
      />
      <input
        ref={fileInput}
        type="file"
        onChange={handleChangeFile}
        style={{ display: "none" }}
      />
    </>
  );
};

export default SendImage;

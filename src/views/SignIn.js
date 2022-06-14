import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { db, provider } from "../firebase";
import { Box, Button } from "@mui/material";
import { getAuth, signInWithPopup } from "firebase/auth";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const SignIn = () => {
  const googleSignIn = async () => {
    try {
      const auth = getAuth();

      const data = await signInWithPopup(auth, provider);

      isExistingUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const isExistingUser = async (data) => {
    const userDocRef = doc(db, "users", data.user.uid);

    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) return;
    saveUserData(data);
  };

  const subscribeToTestChat = async (data) => {
    await updateDoc(doc(db, "chats", "xR86zgd95w4BJapy7klu"), {
      members: arrayUnion(data.user.uid),
    });
  };

  const saveUserData = async (data) => {
    await setDoc(doc(db, "users", data.user.uid), {
      uid: data.user.uid,
      displayName: data.user.displayName,
      email: data.user.email,
      photoURL: data.user.photoURL,
    });

    subscribeToTestChat(data);
  };

  return (
    <Box
      alignItems="center"
      backgroundColor="bgPrimary.main"
      display="flex"
      height="100vh"
      justifyContent="center"
      width="100vw"
    >
      <Box
        alignItems="center"
        backgroundColor="bgSecondary.main"
        display="flex"
        flexDirection="column"
        padding="3rem"
        borderRadius="10px"
        sx={{ boxShadow: 5, mx: "0.5rem" }}
      >
        <Box
          backgroundColor="secondary.main"
          borderRadius="10px"
          mb="3rem"
          padding="0.75rem"
        >
          <ChatBubbleOutlineIcon sx={{ color: "#fff", fontSize: 100 }} />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => googleSignIn()}
        >
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;

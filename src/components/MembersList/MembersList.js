import MembersListItem from "./MembersListItem";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { Box, List, Typography } from "@mui/material";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const MembersList = ({ chatData }) => {
  const [currentMembers, setCurrentMembers] = useState([]);

  const getMemberData = async (id) => {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    return { id: userSnap.id, data: userSnap.data() };
  };

  const subscribeMembers = () => {
    const chatRef = doc(db, "chats", chatData.id);

    return onSnapshot(chatRef, async (snapshot) => {
      const memberData = await Promise.all(
        snapshot.data().members.map(getMemberData)
      );

      setCurrentMembers(memberData);
    });
  };

  useEffect(() => {
    const unsubscribeMembers = subscribeMembers();

    return () => {
      unsubscribeMembers();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      backgroundColor="bgSecondary.main"
      border="2px solid rgba(255, 255, 255, 0.15)"
      left="50%"
      position="absolute"
      top="50%"
      sx={{
        py: 3.5,
        px: 5,
        boxShadow: 24,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography
        id="modal-modal-title"
        variant="h6"
        textAlign="center"
        sx={{ mb: 3.5 }}
      >
        Current Members
      </Typography>
      <List dense sx={{ height: "200px", overflow: "auto", width: "275px" }}>
        {currentMembers.map((member) => (
          <MembersListItem key={member.id} member={member} />
        ))}
      </List>
    </Box>
  );
};

export default MembersList;

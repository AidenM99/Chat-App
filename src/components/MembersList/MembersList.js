import MembersListItem from "./MembersListItem";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { StyledContainer, StyledList } from "./MembersList.styled";

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
    <StyledContainer sx={{ boxShadow: 24 }}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        textAlign="center"
        sx={{ mb: 3.5 }}
      >
        Current Members
      </Typography>
      <StyledList dense>
        {currentMembers.map((member) => (
          <MembersListItem key={member.id} member={member} />
        ))}
      </StyledList>
    </StyledContainer>
  );
};

export default MembersList;

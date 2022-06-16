import TopPanel from "./TopPanel/TopPanel";
import ChatsList from "./ChatsList/ChatsList.js";
import { StyledContainer } from "./Sidebar.styled";

const Sidebar = () => {
  return (
    <StyledContainer>
      <TopPanel />
      <ChatsList />
    </StyledContainer>
  );
};

export default Sidebar;

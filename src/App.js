import styled from "styled-components";
import Chatroom from "./components/chatroom";
import Description from "./components/description";

const HomeContainer = styled.div``;

function App() {
  return (
    <HomeContainer className="App">
      <Description />
      <Chatroom />
    </HomeContainer>
  );
}

export default App;

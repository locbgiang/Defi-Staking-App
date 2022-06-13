import { Header } from './components/Header'
import { StakeDetails } from './components/StakeDetails'
import styled from "styled-components";

const FullApp = styled.div`
  height:100vh;
  width: 100%;

  background-color: black;
`
function App() {
  return (
    <FullApp>
      <Header />
      <StakeDetails />
    </FullApp>
  )
}

export default App

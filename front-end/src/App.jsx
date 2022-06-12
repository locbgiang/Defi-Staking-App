import { Header } from './components/Header'
import { StakeDetails } from './components/StakeDetails'
import { StakeForm } from './components/StakeForm'
import styled from "styled-components";

const FullApp = styled.div`
  height:100vh;
  width: 100%;
`
function App() {
  return (
    <FullApp>
      <Header />
      <StakeDetails />
      <StakeForm />
    </FullApp>
  )
}

export default App

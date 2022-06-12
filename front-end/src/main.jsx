import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ContractProvider } from "./context/ContractContext";
//import { MoralisProvider } from "react-moralis";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContractProvider>
      <App />
    </ContractProvider>
  </React.StrictMode>
)

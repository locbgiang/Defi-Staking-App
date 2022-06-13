import React from "react";
import { useState, useContext } from "react";
import styled from 'styled-components';
import { ContractContext } from '../context/ContractContext';
import { shortenAddress } from "../utils/shorttenAddress";


const NavContainer = styled.div`
  height: 10%;
  display: flex;
`;

const ProjectName = styled.div`
  width: 50%;

  display:flex;
  align-items: center;
  padding-left: 80px;

  color: white;
  font-size: 30px;
`

const LoginSpace = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 80px;
`
const LoginButton = styled.button`
  background-color: #383838;
  border-radius: 10px;
  font-size: 30px;
  color: white;
  &:hover {
    background-color: grey;
  }
`



export function Header(){
  const { connectWallet, currentAccount } = useContext(ContractContext);
  return (
    <NavContainer>
      <ProjectName>
        DEFI STAKING APP (Goerli Testnet)
      </ProjectName>
      <LoginSpace>
        {!currentAccount && // if there is a metamask acc connected dont render button
          <LoginButton
            onClick={connectWallet}
          >
            Connect Wallet
          </LoginButton>
        }
        {currentAccount && // if there is a metamask acc display address 
          <LoginButton>
            {shortenAddress(currentAccount)}
          </LoginButton>
        }
      </LoginSpace>
    </NavContainer>
  )
}

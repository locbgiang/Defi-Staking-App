import React from "react";
import { useState, useContext } from "react";
import { ContractContext } from '../context/ContractContext';
import { StakeForm } from "./StakeForm";
import styled from 'styled-components'

const InfoArea = styled.div`
    height: 600px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`

const InfoCard = styled.div`
    border: 1px solid black;
    height: 100%;
    width: 25%;
    background-color: #1a1a1a;

    display: flex;
    justify-content: space-evenly;
    align-items: start;
    flex-direction: column;

    border-radius: 20px;
`

const StaticDetails = styled.div`
    height: 40%;
    width: 100%;

    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`

const Item = styled.div`
    width: 100%;
    height: 33%;

    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const StaticDetailName = styled.div`
    color:white;
    width: 90%;
`

const Balances = styled.div`
    height: 50%;
    width: 90%;
    background-color:silver;
    border-radius: 10px;

    display:flex;
    justify-content: end;
    align-items: center;

    font-size: 40px;
`


const FormArea = styled.div`
    height: 60%;
    width: 100%;
`

export function StakeDetails(){
    const { rtBalance, stakedBalance, earnedBalance } = useContext(ContractContext);
    return(
        <InfoArea>
            <InfoCard>
                <StaticDetails>
                    <Item>
                        <StaticDetailName>
                            Reward token balance
                        </StaticDetailName>
                        <Balances>
                            {rtBalance}
                        </Balances>
                    </Item>
                    <Item>
                        <StaticDetailName>
                            Staked balance
                        </StaticDetailName>
                        <Balances>
                            {stakedBalance}
                        </Balances>
                    </Item>
                        
                    <Item>
                        <StaticDetailName>
                            Earned balance
                        </StaticDetailName>
                        <Balances>
                            {earnedBalance}
                        </Balances>
                    </Item>
                        

                </StaticDetails>
                <FormArea>
                    <StakeForm />
                </FormArea>
            </InfoCard>
        </InfoArea>
    )
}
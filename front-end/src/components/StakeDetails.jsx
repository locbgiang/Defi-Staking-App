import React from "react";
import { useState, useContext } from "react";
import { ContractContext } from '../context/ContractContext';
import styled from 'styled-components'

const InfoArea = styled.div`
    height: 300px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`

const InfoCard = styled.div`
    border: 1px solid black;
    height: 80%;
    width: 40%;

    display: flex;
    justify-content: space-evenly;
    align-items: start;
    padding-left: 20px;
    flex-direction: column;
`

const InfoItem = styled.div`
    font-size: 20px;
`

export function StakeDetails(){
    const { rtBalance, stakedBalance, earnedBalance } = useContext(ContractContext);
    return(
        <InfoArea>
            <InfoCard>
                <InfoItem>
                    Reward token balance: {rtBalance}
                </InfoItem>
                <InfoItem>
                    Staked balance: {stakedBalance}
                </InfoItem>
                <InfoItem>
                    Earned balance: {earnedBalance}
                </InfoItem>
            </InfoCard>
        </InfoArea>
    )
}
import React from "react";
import { useState, useContext } from "react";
import { ContractContext } from '../context/ContractContext';
import styled from "styled-components";

const InputArea = styled.div`
    height: 40%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`
const Title = styled.div`
    font-size: 30px;
`

const Input = styled.input`
    width: 20%;
`

const Button = styled.button`
    width: 10%;
    margin-top: 5px;
`

export function StakeForm(){
    const { handleChange, formData, submitStake, mintToken, withdrawToken, claimReward} = useContext(ContractContext);
    const handleSubmit = (e) =>{
        const { stakingAmount } = formData
        e.preventDefault();
        if(!stakingAmount) return;
        submitStake();
    }
    const handleWithdrawSubmit = (e) =>{
        const {withdrawingAmount} = formData;
        e.preventDefault();
        if(!withdrawingAmount) return;
        withdrawToken();
    }
    return(
        <InputArea>
            <Title>
                Mint some reward token:
            </Title>
            <Button onClick={mintToken}>Mint Token</Button>
            <Title>
                Enter amount to be staked:
            </Title>
            
            <Input 
                name="stakingAmount"
                onChange={(e)=>handleChange(e, "stakingAmount")}
            />
            <Button 
                onClick={handleSubmit}
            >
                Stake
            </Button>
            <Title>
                Enter amount to be withdrawn:
            </Title>
            <Input 
                name="withdrawingAmount"
                onChange={(e)=>handleChange(e, "withdrawingAmount")}
            />
            <Button 
                onClick={handleWithdrawSubmit}
            >
                Withdraw staked
            </Button>
            <Title>
                Claim reward:
            </Title>
            
            <Button 
                onClick={claimReward}
            >
                Claim
            </Button>
        </InputArea>
    )
}
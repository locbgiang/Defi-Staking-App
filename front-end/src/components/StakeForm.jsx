import React from "react";
import { useState, useContext } from "react";
import { ContractContext } from '../context/ContractContext';
import styled from "styled-components";

const InputArea = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`

const Item = styled.div`
    height: 20%;
    width: 90%;

    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.div`
    font-size: 20px;
    color: white;
    width: 90%;
`

const Button1 = styled.button`
    width: 90%;
    height: 50%;
    border-radius: 10px;
    font-size: 20px;

    &:hover {
        background-color: grey;
    }
`

const InputAndButton = styled.div`
    width: 90%;
    height: 50%;

    display:flex;
`

const Input = styled.input`
    width: 70%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`

const Button2 = styled.button`
    width: 30%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    &:hover {
        background-color: grey;
    }
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
            <Item>
                <Title>
                    Mint some reward token:
                </Title>
                <Button1 onClick={mintToken}>Mint Token</Button1>
            </Item>
            <Item>
                <Title>
                    Enter amount to be staked:
                </Title>
                <InputAndButton>
                    <Input 
                        name="stakingAmount"
                        onChange={(e)=>handleChange(e, "stakingAmount")}
                    />
                    <Button2 
                        onClick={handleSubmit}
                    >
                        Stake
                    </Button2>
                </InputAndButton>
            </Item>
            <Item>
                    <Title>
                        Enter amount to be withdrawn:
                    </Title>
                <InputAndButton>
                    <Input 
                        name="withdrawingAmount"
                        onChange={(e)=>handleChange(e, "withdrawingAmount")}
                    />
                    <Button2
                        onClick={handleWithdrawSubmit}
                    >
                        Withdraw Staked
                    </Button2>
                </InputAndButton>
            </Item>
            <Item>
                <Title>
                    Claim reward:
                </Title>
                
                <Button1 
                    onClick={claimReward}
                >
                    Claim
                </Button1>
            </Item>
            
        </InputArea>
    )
}
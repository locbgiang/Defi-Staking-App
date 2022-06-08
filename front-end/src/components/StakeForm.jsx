import React from "react";
import { useState, useContext } from "react";
import { ContractContext } from '../context/ContractContext';
import styled from "styled-components";

const InputArea = styled.div`
    height: 200px;
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
    height: 10%;
`

const Button = styled.button`
    width: 5%;
    margin-top: 5px;
`

export function StakeForm(){
    const { handleChange, formData, submitStake } = useContext(ContractContext);
    const handleSubmit = (e) =>{
        const { stakingAmount } = formData
        e.preventDefault();
        if(!stakingAmount) return;
        submitStake();
    }
    return(
        <InputArea>
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
                Stake Now
            </Button>
        </InputArea>
    )
}
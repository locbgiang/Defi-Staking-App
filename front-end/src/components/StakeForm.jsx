import React from "react";
import { useState, useContext } from "react";
import { ContractContext } from '../context/ContractContext';




export function StakeForm(){
    const { handleChange, formData, submitStake } = useContext(ContractContext);
    const handleSubmit = (e) =>{
        const { stakingAmount } = formData
        e.preventDefault();
        if(!stakingAmount) return;
        submitStake();
    }
    return(<div>
        input
        <input 
            name="stakingAmount"
            onChange={(e)=>handleChange(e, "stakingAmount")}
        />
        <button 
            onClick={handleSubmit}
        >
            Stake Now
        </button>
    </div>)
}
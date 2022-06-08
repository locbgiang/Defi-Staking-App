import React from "react";
import { useState, useContext } from "react";
import { ContractContext } from '../context/ContractContext';

export function StakeDetails(){
    const { rtBalance, stakedBalance, earnedBalance } = useContext(ContractContext);
    return(<div>
        rt balance: {rtBalance}
        <br />
        staked balance: {stakedBalance}
        <br />
        earned balance: {earnedBalance}
    </div>)
}
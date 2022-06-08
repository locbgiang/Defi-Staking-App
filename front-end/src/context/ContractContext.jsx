import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {stakingAddress, rewardTokenAddress, stakingAbi, rewardTokenAbi} from '../constants';

export const ContractContext = React.createContext();

const { ethereum } = window;

const getStakeContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const stakeContract = new ethers.Contract(stakingAddress, stakingAbi, signer);
    return stakeContract;
}

const getRewardTokenContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const rewardTokenContract = new ethers.Contract(rewardTokenAddress, rewardTokenAbi, signer)
    return rewardTokenContract;
}


export const ContractProvider = function({ children }){
    const [currentAccount, setCurrentAccount] = useState("");

    const [rtBalance, setRtBalance] = useState("0");
    const [stakedBalance, setStakedBalance] = useState("0");
    const [earnedBalance, setEarnedBalance] = useState("0");

    const [ formData, setFormData ] = useState({stakingAmount: ''})
    const handleChange = (e, name) => {
        setFormData((prevState) => ({
            ...prevState, [name]: e.target.value
        }))
    }

    const checkIfWalletIsConnected = async function(){
        // this function automatically tells user to connect wallet
        try {
            if(!ethereum) return alert ("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_accounts'});

            if(accounts.length){
                setCurrentAccount(accounts[0])
            } else {
                console.log('No accounts found')
            }
        } catch (error) {
            throw new Error('No ethereum object.')
        }
    }
    const connectWallet = async function(){
        // this function connect metamask wallet with this app
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    const getRtBalance = async function() {
        // this function get the reward token balance from the current account
        const rtContract = getRewardTokenContract();
        const rtInWalletBigN = await rtContract.balanceOf(currentAccount);
        const decimals = await rtContract.decimals();
        const formattedRtBalanceFromContract = ethers.utils.formatUnits(
            rtInWalletBigN,                                              // big number from the promise
            decimals                                                    // decimals from the promise
        )
        setRtBalance(formattedRtBalanceFromContract)
    }

    const getStakedBalance = async function(){
        // this function set the total staked 
        const stakeContract = getStakeContract();
        const totalStaked = await stakeContract.getStaked(currentAccount);
        const decimals = await stakeContract.decimals();
        const formattedStakedBalance = ethers.utils.formmatUnits(
            totalStaked,
            decimals
        )
        setStakedBalance(formattedStakedBalance);
    }

    const getEarnedBalance = async function(){
        // this function set the total earned balance
        const stakeContract = getStakeContract();
        const totalEarned = await stakeContract.earned(currentAccount);
        const decimals = await stakeContract.decimals();
        const formmattedEarnedBalance = ethers.utils.formmatUnits(
            totalEarned,
            decimals
        )
        setEarnedBalance(formmattedEarnedBalance);
    }

    const submitStake = async function(){
        const amountToApprove = formData.stakingAmount;
        console.log(amountToApprove)
    }


    useEffect(()=>{
        checkIfWalletIsConnected(); // auto call function once on starting
        //update the ui and get balances
        if (currentAccount){
            getRtBalance();
            getStakedBalance();
            getEarnedBalance();
        }
    },[currentAccount, rtBalance])


    return(
        <ContractContext.Provider value={{
            connectWallet,
            currentAccount,
            rtBalance,
            stakedBalance,
            earnedBalance,
            handleChange,
            formData,
            submitStake

        }}>
            {children}
        </ContractContext.Provider>
    );
}
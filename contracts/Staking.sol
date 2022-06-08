// stake: Lock tokens into our smart contract (check)
// withdraw: unlock tokens and pull out of the contract (check)
// claimReward: users get their reward tokens
//      what's a good reward mechanism?
//      what's some good reward math?

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error Staking__TransferFailed();
error Staking__NeedsMoreThanZero();

contract Staking {
    IERC20 public s_stakingToken;
    IERC20 public s_rewardToken;
    
    // address mapped to how much they staked
    mapping(address => uint256) public s_balances;

    // a mapping of how much each address has been paid
    mapping (address => uint256) public s_userRewardPerTokenPaid;

    // a mapping of how much reward user has to claim
    mapping (address => uint256) public s_rewards;

    uint256 REWARD_RATE;
    uint256 s_totalSupply;
    uint256 s_rewardPerTokenStored;
    uint256 s_latestUpdateTime;

    modifier updateReward (address account){
        // how much reward per token?
        // last timestamp
        // 12 - 1, user earned X tokens
        s_rewardPerTokenStored = rewardPerToken();
        s_latestUpdateTime = block.timestamp;
        s_rewards[account] = earned(account);
        s_userRewardPerTokenPaid[account] = s_rewardPerTokenStored;
        _;
    }

    modifier moreThanZero(uint256 amount){
        if(amount == 0){
            revert Staking__NeedsMoreThanZero();
        }
        _;  // when you write a modifier code, this tells you to do whatever the function is doing after the modifier
    }

    constructor(address stakingToken, address rewardToken){
        s_stakingToken = IERC20(stakingToken);
        s_rewardToken = IERC20(rewardToken);
    }    

    function earned (address account ) public view returns(uint256){
        uint256 currentBalance = s_balances[account];
        // how much they have been paid already
        uint256 ammountPaid = s_userRewardPerTokenPaid[account];
        uint256 currentRewardPerToken = rewardPerToken();
        uint256 pastRewards = s_rewards[account];
        uint256 _earned = (currentBalance * (currentRewardPerToken - ammountPaid))/1e18 + pastRewards;
        return _earned;
    }

    // how much reward per token
    // based on how long it's been during this most recent snapshot
    function rewardPerToken() public view returns(uint256) {
        if (s_totalSupply == 0){
            return s_rewardPerTokenStored;
        }
        return s_rewardPerTokenStored + (((block.timestamp - s_latestUpdateTime) * REWARD_RATE * 1e18)/ s_totalSupply);
    }

    // do we allow any tokens? - not allow any token
    //      chainlink stuff to convert prices between tokens.
    // or just a specific token?
    function stake(uint256 amount) external updateReward(msg.sender) moreThanZero(amount){
        // keep track of how much this user has staked
        // keep track of how much token we have total
        // transfer the tokens to this contract
        s_balances[msg.sender] = s_balances[msg.sender] + amount;
        s_totalSupply = s_totalSupply + amount;
        // emit event
        bool success = s_stakingToken.transferFrom(msg.sender, address(this), amount);
        
        // require(success, "failed");
        if(!success) {
            revert Staking__TransferFailed();
        }
    } 
    
    function withdraw(uint256 amount) external updateReward(msg.sender){
        s_balances[msg.sender] = s_balances[msg.sender] - amount;
        s_totalSupply = s_totalSupply - amount;
        bool success = s_stakingToken.transfer(msg.sender, amount);
        //bool success = s_stakingToken.transferFrom(address(this), msg.sender, amount);
        if (!success){
            revert Staking__TransferFailed();
        }
    }

    function claimReward() external updateReward(msg.sender) {
        uint256 reward = s_rewards[msg.sender];
        bool success = s_rewardToken.transfer(msg.sender, reward);
        if (!success) {
            revert Staking__TransferFailed();
        }
        // How much reward do they get?
        
        // The contract is going to emit X tokens per second
        // And disperse them to all token stakers

        // 100 tokens / second
        // 50 staked tokens, 20 staked tokens, 30 staked tokens
        // rewards: 50 reward tokens, 20 reward tokens, 30 reward tokens

        // staked: 100, 50, 20, 30 (total = 200)
        // reward: 50, 25, 10, 15

        // why not 1 to 1? - bankrupt your protocol
        

        // 5 seconds, 1 person had 100 tokens staked = reward 500 tokens
        // 6 seconds, 2 person have 100 tokens staked each:
            // person 1: 550
            // person 2: 50
        
        // ok between seconds 1 and 5, person 1 got 500 tokens
        // ok at second 6 on, person 1 gets 50 tokens now
    }

    function getStaked(address account) public view returns(uint256) {
        // get amount staked in the address
        return s_balances[account];
    }
}


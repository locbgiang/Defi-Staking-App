
const main = async () => {
    const rtToken = await hre.ethers.getContractFactory("RewardToken");
    const token = await rtToken.deploy();

    await token.deployed();

    const stakingContract = await hre.ethers.getContractFactory("Staking");
    const staking = await stakingContract.deploy({args: [token.address, token.address]});

    await staking.deployed();

    console.log("Reward token deployed to: ", token.address);
    console.log("Staking deployed to: ", staking.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

runMain();
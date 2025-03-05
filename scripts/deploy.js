const { ethers } = require("hardhat");

async function main() {
    const ProfileContract = await ethers.getContractFactory("CustomerProfile");
    const contract = await ProfileContract.deploy();
    await contract.waitForDeployment();
    
    console.log("Contract deployed to:", await contract.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

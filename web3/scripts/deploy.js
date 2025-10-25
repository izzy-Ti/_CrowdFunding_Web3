const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying CrowdFunding contract...");

  const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy();

  await crowdFunding.waitForDeployment();

  const address = await crowdFunding.getAddress();
  console.log("CrowdFunding deployed to:", address);

  // Update the .env file with the new contract address
  console.log("\nPlease update your .env file with:");
  console.log(`VITE_CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


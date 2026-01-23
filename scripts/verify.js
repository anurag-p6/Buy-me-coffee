// scripts/verify.js
const hre = require("hardhat");

async function main() {
  // Replace with your deployed contract address
  const contractAddress = "0x3D43fF3b917D2E4e546B8D9D5E74363e6F8c9176";
  
  // Replace with constructor arguments used during deployment
  const constructorArgs = [
    // Example: "arg1", 123, "0xAddress"
  ];

  console.log("Verifying contract at:", contractAddress);
  console.log("With constructor arguments:", constructorArgs);

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Contract is already verified!");
    } else {
      console.error("Verification failed:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
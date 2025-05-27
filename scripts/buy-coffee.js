const hre = require("hardhat");

async function main () {
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const deployedBuyMeACoffee = await BuyMeACoffee.deploy();

    await deployedBuyMeACoffee.deployed;

    console.log("Contract Deployed to:", await deployedBuyMeACoffee.getAddress());
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
})
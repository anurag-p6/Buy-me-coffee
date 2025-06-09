const { expect } = require("chai");

describe("BuyMeACoffee", function () {
  it("Should store memos and allow withdrawal", async function () {
    const [owner, user1] = await ethers.getSigners();
    const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
    const contract = await BuyMeACoffee.deploy();
    await contract.waitForDeployment();

    const tx = await contract.connect(user1).buyCoffee("Alice", "Great work!", {
      value: ethers.parseEther("0.001"),
    });
    await tx.wait();

    const memos = await contract.getMemos();
    expect(memos.length).to.equal(1);
    expect(memos[0].name).to.equal("Alice");

    const contractBalance = await ethers.provider.getBalance(contract.target);
    expect(contractBalance).to.equal(ethers.parseEther("0.001"));
  });
});

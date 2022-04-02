// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
      console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }
  
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy("0xadD19b9B060A07484F31Ed2cc837e8dedf0CF6b6");
    await market.deployed();
  
    console.log("Market address:", market.address);
    
    // We also save the contract's artifacts and address in the frontend directory
    showMerketDetails(market);
  }
  
  function showMerketDetails(market) {
    const fs = require("fs");
    const path = require('path');
  
    const contractsDir = path.resolve(
      process.cwd(),
      'constants'
    );
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + "/market-address.json",
        JSON.stringify({ NFTMarket: market.address }, undefined, 2)
    );

    const MerketArtifact = artifacts.readArtifactSync("NFTMarket");
  
    fs.writeFileSync(
      contractsDir + "/ABI.json",
      JSON.stringify(MerketArtifact, null, 2)
    );
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
const hre = require("hardhat");

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  // eslint-disable-next-line no-undef
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
      "gets automatically created and destroyed every time. Use the Hardhat" +
      " option '--network localhost'"
    );
  }

  // eslint-disable-next-line no-undef
  const Phunk = await ethers.getContractFactory("ExpansionPhunks");
  const phunk = await Phunk.deploy("https://ipfs.io/ipfs/QmSH2wPew8BfQcCRwAYs4J7yXZcwVmiUpWX3YrxTH4SLBL/");
  await phunk.deployed();

  console.log("Phunk address:", phunk.address);

  // eslint-disable-next-line no-undef
  const Market = await ethers.getContractFactory("NFTMarket");
  const market = await Market.deploy(process.env.TREASURY_ADDRESS, phunk.address);
  await market.deployed();

  console.log("Market address:", market.address);

  // We also save the contract's artifacts and address in the frontend directory
  await showMerketDetails(market, phunk);

  // set approve all for the market
  await setApproveMarketToAll(market, phunk);
}

async function showMerketDetails(market, phunk) {
  const fs = require("fs");
  const path = require('path');

  const contractsDir = path.resolve(
    process.cwd(),
    'src/redux/constants'
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  // eslint-disable-next-line no-undef
  const MerketArtifact = JSON.stringify(artifacts.readArtifactSync("NFTMarket").abi);
  const MarketAddress = `export const MarketplaceAddress = "${market.address}";export const MarketplaceABI = ${MerketArtifact}`;

  fs.writeFileSync(
    contractsDir + "/marketAddress.js",
    MarketAddress
  );
  
  // eslint-disable-next-line no-undef
  const PhunkArtifact = JSON.stringify(artifacts.readArtifactSync("ExpansionPhunks").abi);
  const PhunkAddress = `export const PhunkAddress = "${phunk.address}";export const PhunkABI = ${PhunkArtifact}`;

  fs.writeFileSync(
    contractsDir + "/phunkAddress.js",
    PhunkAddress
  );
}

async function setApproveMarketToAll(market, phunk) {
  await phunk.setApprovalForAll(market.address, true);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

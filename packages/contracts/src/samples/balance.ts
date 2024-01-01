import { ethers } from "ethers";

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const balance = await provider.getBalance(
    "0x1cbd3b2770909d4e10f157cabc84c7264073c9ec"
  );

  console.log("Balance:", ethers.utils.formatEther(balance.toString()));
};

main();

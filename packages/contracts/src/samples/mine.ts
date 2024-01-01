import { ethers } from "ethers";
// import PasswordAttack from "../artifacts/src/contracts/PasswordAttack.sol/PasswordAttack.json";

export const mine = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  await provider.send("evm_mine", []);

  // const contract = new ethers.Contract(
  //   "0x8464135c8F25Da09e49BC8782676a84730C318bC",
  //   PasswordAttack.abi,
  //   provider
  // );

  // console.log(await contract.setter());
};

mine();

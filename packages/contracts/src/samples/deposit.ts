import { ethers, ContractFactory } from "ethers";

const PRIVATE_KEY =
  "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";

const deposit = async ({
  address,
  amount,
}: {
  address: string;
  amount: number;
}) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  let signer = new ethers.Wallet(PRIVATE_KEY, provider);

  await signer.sendTransaction({
    to: address,
    data: "0x",
    value: ethers.utils.parseEther(amount.toString()),
    gasPrice: "4000000000",
  });
};

const main = async () => {
  await deposit({
    address: "0x8464135c8F25Da09e49BC8782676a84730C318bC",
    amount: 50,
  });
};

main();

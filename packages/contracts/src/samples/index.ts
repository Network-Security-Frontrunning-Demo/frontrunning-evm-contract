import { ethers } from "ethers";

const main = async () => {
  const provider = new ethers.providers.WebSocketProvider(
    "ws://127.0.0.1:8545/websocket"
  );

  console.log("Pending...");
  provider.on("pending", (data) => {
    const tx = provider.getTransaction(data);
    tx.then((res: any) => {
      console.log(res);
    });
  });

  provider.on("block", (block) => {
    const data = provider.getBlock(block);

    data.then((res) => {
      const blockHash = res?.transactions;
      console.log(blockHash);
    });
  });
};

main();

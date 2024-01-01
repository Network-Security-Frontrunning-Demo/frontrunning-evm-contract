## Roles for each packages:
* frontend:
   - Display an UI that show transactions on mempool (show transactions real-time in priority queued based on gas price, which is functionality of EVM mempool).
   - Show that transaction on mempool can be detected.
   - Show contract state before and after executed.
   - A button to mint new block, for showing frontrunning.
* backend: (for simplicity, we use frontend as backend)
   - Websocket for emitting new transactions from mempool. With transactions that satisfy the requirement for frontrun, then add a new status: true.
   - Add an POST api for mining new block.
   - Add an POST api for deploying targeted contract.
* contract:
   - Running private evm blockchain.

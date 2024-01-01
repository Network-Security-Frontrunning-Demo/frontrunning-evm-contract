import { ethers, ContractFactory } from "ethers";
import PasswordAttack from "../artifacts/src/contracts/PasswordAttack.sol/PasswordAttack.json";
import EnsRegistryWithFallback from "../wagmi-initial-abis/ENSRegistryWithFallback.json";
import EnsRegistry from "../wagmi-initial-abis/ENSRegistry.json";
import UniversalResolver from "../wagmi-initial-abis/UniversalResolver.json";
import Multicall3 from "../wagmi-initial-abis/Multicall3.json";

const PRIVATE_KEY =
  "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

export const deployContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  let signer = new ethers.Wallet(PRIVATE_KEY, provider);

  const passwordAttackFactory = new ContractFactory(
    PasswordAttack.abi,
    PasswordAttack.bytecode,
    signer
  );
  const passwordAttackContract = await passwordAttackFactory.deploy([]);

  const ensFactory = new ContractFactory(
    EnsRegistry.abi,
    EnsRegistry.bytecode,
    signer
  );
  const ensContract = await ensFactory.deploy([]);
  await provider.send("evm_mine", []);

  const ensRegistryFactory = new ContractFactory(
    EnsRegistryWithFallback.abi,
    EnsRegistryWithFallback.bytecode,
    signer
  );
  const ensRegisterContract = await ensRegistryFactory.deploy(
    ensContract.address
  );

  const universalResolverFactory = new ContractFactory(
    UniversalResolver.abi,
    UniversalResolver.bytecode,
    signer
  );
  const universalResolverContract = await universalResolverFactory.deploy(
    ensRegisterContract.address,
    []
  );

  const multicallFactory = new ContractFactory(
    Multicall3.abi,
    Multicall3.bytecode,
    signer
  );
  const multicallContract = await multicallFactory.deploy([]);
  await provider.send("evm_mine", []);

  console.log("ENS Address: ", ensContract.address);
  console.log("ENS Registry Address: ", ensRegisterContract.address);
  console.log("Universal Resolver: ", universalResolverContract.address);
  console.log("Multicall: ", multicallContract.address);
  console.log("Password Attack: ", passwordAttackContract.address);
};

deployContract();

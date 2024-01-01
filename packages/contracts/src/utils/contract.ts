import PasswordAttack from "../artifacts/src/contracts/PasswordAttack.sol/PasswordAttack.json";
import { ContractArtifactsInterface } from "../@types";

enum ContractEnums {
  PasswordAttack,
}

const contractArtifacts: ContractArtifactsInterface = {
  [ContractEnums.PasswordAttack]: {
    abi: PasswordAttack.abi,
    bytecode: PasswordAttack.bytecode,
  },
};

export { ContractEnums, contractArtifacts };

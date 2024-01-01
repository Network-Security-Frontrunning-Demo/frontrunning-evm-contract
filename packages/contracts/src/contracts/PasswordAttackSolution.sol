// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PasswordAttack {
    bytes32 public hashPassword =
        0x8283cdfe5070f6aae4bb830a6567261f6e54d1ad13c42cd0cba8df5d3370c678;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    modifier onlyOwner() {
        require(msg.sender == owner, "Err: Not owner");
        _;
    }

    function withdraw(
        string memory password,
        address _rewarder
    ) external onlyOwner {
        require(
            keccak256(abi.encodePacked(password)) == hashPassword,
            "Err: Not correct password"
        );

        (bool success, ) = payable(_rewarder).call{
            value: address(this).balance
        }("");

        require(success, "Err: Withdraw failed");
    }
}

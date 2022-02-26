// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract CanopyVault {

    address public owner;

    event Deposit(address from, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function bridgeToken(uint256 amount, IERC20 token) external {
        emit Deposit(msg.sender, amount);
    }

}
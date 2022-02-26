// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";


contract sNCT is ERC20PresetMinterPauser {

    event Burn(uint256 amount, address from);

    constructor(string memory name, string memory symbol) ERC20PresetMinterPauser (name, symbol) {}

    function burn(uint256 amount) override public {
        ERC20Burnable.burn(amount);
        emit Burn(amount, msg.sender);
    }

}
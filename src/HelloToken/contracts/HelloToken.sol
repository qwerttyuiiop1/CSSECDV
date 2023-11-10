// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@open-zeppelin/ERC20.sol";

contract HelloToken is ERC20("HELLO", "HLO") {

    address private owner;

    constructor() {
        owner = msg.sender;
        _mint(msg.sender, 1000000 * 10**9);
    }
}

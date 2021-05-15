// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract ColPay {
    string public name;

    constructor() {
        name = "Payment Fragmentation Service";
    }

    // TEST CONTRACT
    uint private value;

    // Emitted when the stored value changes
    event ValueChanged(uint newValue);

    // Stores a new value in the contract
    function store(uint newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint) {
        return value;
    }
}
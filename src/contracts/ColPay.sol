// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./CPToken.sol" as CPToken;

contract ColPay {
    string public name;
    address public owner;
    CPToken.CPToken public cpToken;

    mapping(uint => PaymentContract) public paymentContracts;
    mapping(address => uint[]) public paymentContractsHeldPerAddress;

    struct Transaction {
        uint256 date;
        uint value;
    }

    struct PaymentContract {
        uint id;
        string name;
        uint totalAmount;
        uint amountPayed;
        address buyer;
        address payable seller;
        Transaction[] transactions;
        uint256 startDate;
        uint256 expiryDate;
        bool completed;
    }

    constructor(CPToken.CPToken _cpToken) {
        name = "Payment Fragmentation Service";
        cpToken = _cpToken;
        owner = msg.sender;
    }

    // Request Tokens - for new accounts
    function requestTokens(uint256 _value) public {
        // check for valid requests
        require(_value > 0, "Amount Requested Cannot be 0");
        require(_value < cpToken.balanceOf(address(this))/10, "amount cannot be larger than 10% of current supply");
        require(cpToken.balanceOf(msg.sender) == 0 && paymentContractsHeldPerAddress[msg.sender].length == 0, "only issue tokens to new accounts");

        cpToken.transfer(msg.sender, _value);
    }

    // Create Transactions

    // Request a Payment

    // Make a Payment

    // Liquidate contract?

    // Purchase a contract?
}
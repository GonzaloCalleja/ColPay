// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./CPToken.sol" as CPToken;
import "./DateTimeLibrary.sol" as DateTimeLibrary;

contract ColPay {
    string public name;
    address public owner;
    uint public contractCount;
    CPToken.CPToken public cpToken;

    mapping(uint => PaymentContract) public paymentContracts;
    mapping(uint => Transaction[]) public transactionLists;
    mapping(address => uint[]) public paymentContractsHeldPerAddress;

    struct Transaction {
        uint256 date;
        uint value;
    }

    struct PaymentContract {
        uint id;
        string name;
        uint totalAmount;
        uint amountPaid;
        address buyer;
        address payable seller;
        uint256 startDate;
        uint256 expiryDate;
        uint daysToOpen;
        uint speed;
        bool completed;
        bool agreementStatus;
    }

    event PaymentContractCreated (
        uint id,
        string name,
        uint totalAmount,
        uint amountPaid,
        address buyer,
        address payable seller,
        uint256 startDate,
        uint256 expiryDate,
        uint daysToOpen,
        uint speed,
        bool completed,
        bool agreementStatus
    );

    constructor(CPToken.CPToken _cpToken) {
        name = "Payment Fragmentation Service";
        cpToken = _cpToken;
        owner = msg.sender;
        contractCount = 0;
    }

    // Request Tokens - for new accounts
    function issueTokens(uint256 _value) public {
        // Check for valid requests
        require(_value > 0, "Amount Requested Must be more than 0 CPTokens");
        require(_value < cpToken.balanceOf(address(this))/100, "Amount Requested cannot be larger than 1% of current supply");
        require(cpToken.balanceOf(msg.sender) == 0 && paymentContractsHeldPerAddress[msg.sender].length == 0, "This function only issues CPTokens to new accounts");

        cpToken.transfer(msg.sender, _value);
    }

    // Create Payment Contract
    function createPaymentContract (string memory _name, uint _totalAmount, uint256 _startDate, uint256 _expiryDate, uint _daysToOpen, uint _speed, bool _isSeller) public {
        // Check for valid requests
        require(_startDate > _expiryDate, "The Payment Contract cannot finish before starting");
        require(_totalAmount > 0, "Amount to Pay must be more than 0 CPTokens");
        require(bytes(_name).length > 0, "The name of the Payment Contract must be valid");
        require(DateTimeLibrary.DateTimeLibrary.diffDays(_startDate, _expiryDate) / 2 < _daysToOpen, "The contract must allow transactions before half the time has passed");
        require(_speed > 0 && _speed < 100, "The payment speed of the contract must be between 0 and 100");

        // Increment contractCount
        contractCount ++;

        // Create the Contract
        address buyer;
        address payable seller;
        if (_isSeller){
            seller = payable(msg.sender);
        } else {
            buyer = msg.sender;
        }
        paymentContracts[contractCount] = PaymentContract(contractCount, _name, _totalAmount, 0, buyer, seller, _startDate, _expiryDate, _daysToOpen, _speed, false, false);

        // Trigger Event
        emit PaymentContractCreated(contractCount, _name, _totalAmount, 0, buyer, seller, _startDate, _expiryDate, _daysToOpen, _speed, false, false);
    }

    // Request a Payment

    // Make a Payment

    // Liquidate contract?

    // Purchase a contract?

}
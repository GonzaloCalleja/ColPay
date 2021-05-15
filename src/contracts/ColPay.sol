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
    mapping(address => uint) public totalDebt;
    mapping(address => uint[]) public paymentContractsHeldPerAddress;

    uint constant NOT_REVIEWED_STATUS = 1;
    uint constant REJECTED_STATUS = 2;
    uint constant ACCEPTED_STATUS = 3;
    uint constant EXPIRED_STATUS = 4;
    uint constant FULFILLED_STATUS = 5;

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
        address seller;
        uint256 startDate;
        uint256 expiryDate;
        uint daysToOpen;
        uint speed;
        uint contractStatus;
        bool createdBySeller;
    }

    event PaymentContractCreated (
        uint id,
        string name,
        uint totalAmount,
        uint amountPaid,
        address buyer,
        address seller,
        uint256 startDate,
        uint256 expiryDate,
        uint daysToOpen,
        uint speed,
        uint contractStatus,
        bool createdBySeller
    );

    event PaymentContractStatusUpdate (
        uint id,
        address statusUpdatedBy,
        uint contractStatus
    );

    event TransactionMade (
        uint256 date,
        uint contractID,
        uint value
    );

    constructor(CPToken.CPToken _cpToken) {
        name = "Payment Fragmentation Service";
        cpToken = _cpToken;
        owner = msg.sender;
        contractCount = 0;
    }

    // Request Tokens - for new accounts
    function issueTokens(uint256 _value, address _receipient) public {
        // Check for valid requests
        require(msg.sender == owner, "The caller must be ColPay, they control when new accounts are issued the tokens.");
        require(_value > 0, "Amount Requested Must be more than 0 CPTokens");
        require(_value < cpToken.balanceOf(address(this))/100, "Amount Requested cannot be larger than 1% of current supply");
        require(cpToken.balanceOf(msg.sender) == 0 && paymentContractsHeldPerAddress[msg.sender].length == 0, "This function only issues CPTokens to new accounts");

        cpToken.transfer(_receipient, _value);
    }

    // Create Payment Contract
    function createPaymentContract (string memory _name, uint _totalAmount, address _recipient, uint256 _startDate, uint256 _expiryDate, uint _daysToOpen, uint _speed, bool _createdBySeller) public {
        // Check for valid requests
        require(_startDate > _expiryDate, "The Payment Contract cannot finish before starting");
        require(_totalAmount > 0, "Amount to Pay must be more than 0 CPTokens");
        require(bytes(_name).length > 0, "The name of the Payment Contract must be valid");
        require(DateTimeLibrary.DateTimeLibrary.diffDays(_startDate, _expiryDate) / 2 < _daysToOpen, "The contract must allow transactions before half the time has passed");
        require(_speed > 0 && _speed < 100, "The payment speed of the contract must be between 0 and 100");
        require(block.timestamp < _expiryDate, "The Payment Contract Cannot be already expired");
        require(_recipient != msg.sender, "The buyer cannot be the seller");

        // Create the Contract
        address buyer;
        address seller;
        if (_createdBySeller){
            seller = msg.sender;
            buyer = _recipient;
        } else {
            seller = _recipient;
            buyer = msg.sender;
        }

        // Check that the buyer will have enough cpTokens to pay this contract and all others.
        require(totalDebt[buyer] + _totalAmount <= cpToken.balanceOf(buyer), "The buyer must have enough cpTokens to pay this contract and others");

        // Update the buyers total debt
        totalDebt[buyer] = totalDebt[buyer] + _totalAmount;

        paymentContracts[contractCount] = PaymentContract(contractCount, _name, _totalAmount, 0, buyer, seller, _startDate, _expiryDate, _daysToOpen, _speed, NOT_REVIEWED_STATUS, _createdBySeller);

        // Trigger Event
        emit PaymentContractCreated(contractCount, _name, _totalAmount, 0, buyer, seller, _startDate, _expiryDate, _daysToOpen, _speed, NOT_REVIEWED_STATUS, _createdBySeller);

        // Increment contractCount
        contractCount ++;
    }

    // Accept a Payment Contract
    function acceptPaymentContract(uint _contractID) public {
        // Check for valid requests
        require(_contractID > 0 && _contractID <= contractCount, "The contract ID must be valid");

        PaymentContract memory _contract = paymentContracts[_contractID];
        if(_contract.createdBySeller){
            require (msg.sender == _contract.buyer, "Since the contract was created by the seller, only the buyer can accept it");
        } else {
            require (msg.sender == _contract.seller, "Since the contract was created by the buyer, only the seller can accept it");
        }

        updatePaymentContractStatus(_contractID, ACCEPTED_STATUS);
    }

    // Reject a Payment Contract
    function rejectPaymentContract(uint _contractID) public {
        // Check for valid requests
        require(_contractID > 0 && _contractID <= contractCount, "The contract ID must be valid");

        PaymentContract memory _contract = paymentContracts[_contractID];
        if(_contract.createdBySeller){
            require (msg.sender == _contract.buyer, "Since the contract was created by the seller, only the buyer can reject it");
        } else {
            require (msg.sender == _contract.seller, "Since the contract was created by the buyer, only the seller can reject it");
        }

        updatePaymentContractStatus(_contractID, REJECTED_STATUS);
    }

    // Finalize a Payment Contract
    function expirePaymentContract(uint _contractID) public {
        // Check for valid requests
        require(_contractID > 0 && _contractID <= contractCount, "The contract ID must be valid");

        PaymentContract memory _contract = paymentContracts[_contractID];
        require(block.timestamp > _contract.expiryDate, "The contract expiry date must be in the past in order to expire the contract");

        uint remainingValue = _contract.totalAmount - _contract.amountPaid;

        makeTransaction(_contractID, remainingValue);

        updatePaymentContractStatus(_contractID, EXPIRED_STATUS);
    }

    function updatePaymentContractStatus(uint _contractID, uint _newStatusID) private {
        // Check for valid requests
        PaymentContract memory _contract = paymentContracts[_contractID];

        require(_newStatusID == NOT_REVIEWED_STATUS || _newStatusID == REJECTED_STATUS || _newStatusID == ACCEPTED_STATUS || _newStatusID == EXPIRED_STATUS, "The new status must be valid");

        // Change contract agreement status
        _contract.contractStatus = _newStatusID;
        paymentContracts[_contractID] = _contract;

        // Trigger Event
        emit PaymentContractStatusUpdate(_contractID, msg.sender, _newStatusID);

    }

    // Script to be daily to check for contracts that have expired
    function checkForExpiredContracts() public {
        // Only owner can call this function
        require(msg.sender == owner, "The caller must be ColPay, they control the script for detecting expired contracts and liquidating them.");

        // Check for expired contracts
        for (uint i=0; i<contractCount; i++) {
            PaymentContract memory _contract = paymentContracts[i];
            if(block.timestamp > _contract.expiryDate) {
                expirePaymentContract(i);
            }
        }
    }

    // Make a Transaction
    // will move value from buyer to seller & update the remaining amount to contract 
    // this function should use from statement in metadata when called 
    function makeTransaction (uint _contractID, uint _value) public { 
        // Check for valid requests
        require(_contractID > 0 && _contractID <= contractCount, "The contract ID must be valid");
        require(_value > 0, "Amount to Pay must be more than 0 CPTokens");

        PaymentContract memory _contract = paymentContracts[_contractID];
        uint totalPayment = _contract.amountPaid + _value;
        require(totalPayment <= _contract.totalAmount, "Total amount paid must not be more than the total value of PaymentContract");
        require(_contract.contractStatus == ACCEPTED_STATUS, "The new status must allow for payment");
        require(cpToken.balanceOf(msg.sender) >= _value, "The buyer must have enough CPTokens to complete the transaction." );
        require(_contract.buyer == msg.sender || owner == msg.sender, "Only Buyer or ColPay can make transactions in a contract");
        require(block.timestamp > DateTimeLibrary.DateTimeLibrary.addDays(_contract.startDate, _contract.daysToOpen), "Enough days have to have past in order for the contract to allow for transactions");

        uint totalContractTime = DateTimeLibrary.DateTimeLibrary.diffSeconds(_contract.startDate, _contract.expiryDate);
        uint elapsedContractTime = DateTimeLibrary.DateTimeLibrary.diffSeconds(_contract.startDate, block.timestamp);
        uint percentageOfElapsedTime = (elapsedContractTime * 100) / totalContractTime;
        uint percentagePayable = (percentageOfElapsedTime * _contract.speed)/ 100;
        uint maxTotalCurrentTotalPayment = (percentagePayable * _contract.totalAmount) / 100;

        require(maxTotalCurrentTotalPayment <= _contract.amountPaid + _value, "The Contract cannot exceed the maximum amount allowed by the speed.");

        // Add transaction to List of all transactions for that contract
        transactionLists[_contractID].push(Transaction(block.timestamp, _value));

        // Make transaction of cpTokens
        cpToken.transfer(_contract.seller, _value);

        // Update the amount of the contract paid
        _contract.amountPaid = totalPayment;

        // Update contract status if necessary
        if(totalPayment == _contract.totalAmount){
            updatePaymentContractStatus(_contractID, FULFILLED_STATUS);
        }

        paymentContracts[_contractID] = _contract;

        emit TransactionMade(block.timestamp, _contractID, _value);

    }

}
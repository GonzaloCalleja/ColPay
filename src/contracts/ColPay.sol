// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./CPToken.sol" as CPToken;
import "./DateTimeLibrary.sol" as DateTimeLibrary;

contract ColPay {
    // CONTRACT STATUS VARIABLES
    string public name;
    address public owner;
    CPToken.CPToken public cpToken;

    uint public contractCount;

    mapping(address => bool) public isBlocked;
    mapping(address => uint) public incurredDebt;
    mapping(address => uint) public potentialDebt;
    mapping(uint => Transaction[]) public transactionLists;
    mapping(uint => PaymentContract) public paymentContracts;
    mapping(address => uint[]) public paymentContractsHeldPerAddress;


    // STATE VARIABLES FOR CONTRACT STATUS
    enum contractStatus {
        NOT_REVIEWED,
        REJECTED,
        ACCEPTED,
        FULFILLED,
        MISSING_PAYMENT
    }

    // NECESARY STRUCTURES - TRANSACTIONS & PAYMENT CONTRACTS
    struct Transaction {
        uint256 date;
        uint contractId;
        uint value;
        bool successful;
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
        contractStatus status;
        bool createdBySeller;
    }

    // NECESSARY EVENTS - PAYMENT CONTRACT CREATED, STATUS UPDATED, TRANSACTION MADE, ACCOUNT BLOCKED
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
        contractStatus status,
        bool createdBySeller
    );

    event PaymentContractFulfilled (
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
        contractStatus status
    );

    event PaymentContractStatusUpdate (
        uint id,
        address statusUpdatedBy,
        contractStatus status
    );

    event TransactionMade (
        uint256 date,
        uint contractID,
        uint value,
        bool successful
    );

    event ChangeAccountBlockedStatus(
        address account,
        uint contractID,
        uint transactionID,
        bool accountBlocked
    );

    constructor(CPToken.CPToken _cpToken) {
        name = "Payment Fragmentation Service";
        cpToken = _cpToken;
        owner = msg.sender;
        contractCount = 0;

    }

    // Issuing Tokens
    // This function allows the prototype to work, it issues new accounts cpTokens to use in contracts.
    // In actual product, ColPay will require users to prove their ability to pay for contracts with banking information.
    function issueTokens(uint256 _value, address _receipient) public {
        // Check for valid requests
        require(msg.sender == owner, "The caller must be ColPay, they control when new accounts are issued the tokens.");
        require(_value > 0, "Amount Requested Must be more than 0 CPTokens");
        require(_value < cpToken.balanceOf(address(this))/100, "Amount Requested cannot be larger than 1% of current supply");

        cpToken.transfer(_receipient, _value);
    }

    // Create Payment Contract
    function createPaymentContract (string memory _name, uint _totalAmount, address _recipient, uint256 _startDate, uint256 _expiryDate, uint _daysToOpen, uint _speed, bool _createdBySeller) public {
        // IDENTIFY BUYER & SELLER
        address buyer;
        address seller;
        if (_createdBySeller){
            seller = msg.sender;
            buyer = _recipient;
        } else {
            seller = _recipient;
            buyer = msg.sender;
        }
        
        // CHECKS
        require(_startDate < _expiryDate, "The Payment Contract cannot finish before starting");
        require(_totalAmount > 0, "Amount to Pay must be more than 0 CPTokens");
        require(bytes(_name).length > 0, "The name of the Payment Contract must be valid");
        require(DateTimeLibrary.DateTimeLibrary.diffDays(_startDate, _expiryDate) / 2 >= _daysToOpen, "The contract must allow transactions before half the time has passed");
        require(_speed >= 0 && _speed <= 100, "The payment speed of the contract must be between 0 and 100");
        require(block.timestamp < _expiryDate, "The Payment Contract Cannot be already expired");
        require(_recipient != msg.sender, "The buyer cannot be the seller");
        require(isBlocked[buyer] == false, "The buyer is currently blockd for having missed payments.");

        // UPDATE STATE VARIABLES
        potentialDebt[buyer] = potentialDebt[buyer] + _totalAmount;
        paymentContracts[contractCount] = PaymentContract(contractCount, _name, _totalAmount, 0, buyer, seller, _startDate, _expiryDate, _daysToOpen, _speed, contractStatus.NOT_REVIEWED, _createdBySeller);
        paymentContractsHeldPerAddress[seller].push(contractCount);
        paymentContractsHeldPerAddress[buyer].push(contractCount);

        // EMIT EVENT
        emit PaymentContractCreated(contractCount, _name, _totalAmount, 0, buyer, seller, _startDate, _expiryDate, _daysToOpen, _speed, contractStatus.NOT_REVIEWED, _createdBySeller);

        // UPDATE TOTAL AMOUNT OF CONTRACTS
        contractCount ++;
    }

    // Accept a Payment Contract
    function acceptPaymentContract(uint _contractID) public {

        PaymentContract memory _contract = paymentContracts[_contractID];

        // CHECKS:
        require(_contractID >= 0 && _contractID < contractCount, "The contract ID must be valid");
        require(_contract.status == contractStatus.NOT_REVIEWED, "The Contract must be in not reviewed status to accept it");
        require(_contract.expiryDate > block.timestamp, "A contract cannot be accepted after expiry date");
        require(incurredDebt[_contract.buyer] + _contract.totalAmount <= cpToken.balanceOf(_contract.buyer), "The Buyer must have enough funds for the contract to be accepted.");

        if(_contract.createdBySeller){
            require (msg.sender == _contract.buyer, "Since the contract was created by the seller, only the buyer can accept it");
        } else {
            require (msg.sender == _contract.seller, "Since the contract was created by the buyer, only the seller can accept it");
        }

        // UPDATE STATE VARIABLES FOR DEBT
        potentialDebt[_contract.buyer] = potentialDebt[_contract.buyer] - _contract.totalAmount;
        incurredDebt[_contract.buyer] = incurredDebt[_contract.buyer] + _contract.totalAmount;

        // CHANGE CONTRACT STATUS
        _contract.status = contractStatus.ACCEPTED;
        paymentContracts[_contractID] = _contract;
        emit PaymentContractStatusUpdate(_contractID, msg.sender, contractStatus.ACCEPTED);
    }

    // Reject a Payment Contract
    function rejectPaymentContract(uint _contractID) public {

        PaymentContract memory _contract = paymentContracts[_contractID];

        // CHECKS
        require(_contractID >= 0 && _contractID < contractCount, "The contract ID must be valid");
        require(_contract.status == contractStatus.NOT_REVIEWED, "The Contract must be in not reviewed status to reject it");
        require(msg.sender == _contract.buyer || msg.sender == _contract.seller, "Only the buyer or seller can reject a contract (either participant can)");

        // STATE VARIABLES FOR POTENTIAL DEBT 
        potentialDebt[_contract.buyer] = potentialDebt[_contract.buyer] - _contract.totalAmount;

        // CHANGE CONTRACT STATUS
        _contract.status = contractStatus.REJECTED;
        paymentContracts[_contractID] = _contract;
        emit PaymentContractStatusUpdate(_contractID, msg.sender, contractStatus.REJECTED);
    }

    // Finalize a Payment Contract
    function expirePaymentContract(uint _contractID) public {

        PaymentContract memory _contract = paymentContracts[_contractID];

        // CHECKS
        require(_contractID >= 0 && _contractID < contractCount, "The contract ID must be valid");
        require(block.timestamp > _contract.expiryDate, "The contract expiry date must be in the past in order to expire the contract");
        require(
            _contract.status == contractStatus.ACCEPTED
            || _contract.status == contractStatus.MISSING_PAYMENT, "The Contract must be in accepted or missing payment status to expire");
        uint remainingValue = _contract.totalAmount - _contract.amountPaid;

        // IF CONTRACT EXPIRED MAKE TRANSACTION FOR REMAINING VALUE
        makeTransaction(_contractID, remainingValue);
    }

    // DETECTING CONTRACTS WITH MISSED PAYMENT OR EXPIRED STATUS & ATTEMPTING TRANSACTION
    // This function can be executed periodically by ColPay through a script
    // It will be used as an automatic way of executing payments on expired contracts and priorizing contracts with missing payments
    function checkForRequiredPayments() public {

        uint currentTime = block.timestamp;

        // CHECKS
        require(msg.sender == owner, "The caller must be ColPay, they control the script for detecting expired contracts and liquidating them.");
        
        // ITERATE THROUGH ALL CONTRACTS & LOOK AT THEIR STATUS
   
        for (uint i=0; i<contractCount; i++) {
            PaymentContract memory _contract = paymentContracts[i];

            // IF THE CONTRACTS HAVE A MISSING PAYMENT, THEN ATTEMPT TO REPEAT LAST (FAILED) TRANSACTION
            if (transactionLists[i].length > 0){
                Transaction memory lastTransaction = transactionLists[i][transactionLists[i].length - 1];
                if(!lastTransaction.successful){
                    makeTransaction(i, lastTransaction.value);
                }
            }
            
            // IF CONTRACTS EXPIRY DATE IS IN THE PAST & THEY ARE STILL CONSIDERED ACCEPTED, THEN EXPIRE THEM.
            if( currentTime > _contract.expiryDate && _contract.status == contractStatus.ACCEPTED ) {
                expirePaymentContract(i);
            } 
        }
        
    }

    function changeAccountBlockedStatus(address _blockedAccount, uint _contractID, uint _transactionID, bool _accountBlocked) private {
        
        isBlocked[_blockedAccount] = _accountBlocked;
        emit ChangeAccountBlockedStatus(_blockedAccount, _contractID, _transactionID, _accountBlocked);

    }

    // Make a Transaction
    // will move value from buyer to seller & update the remaining amount to contract 
    // this function should use from statement in metadata when called
    function makeTransaction (uint _contractID, uint _value) public{ 

        uint currentTime = block.timestamp;
        PaymentContract memory _contract = paymentContracts[_contractID];
        uint totalPayment = _contract.amountPaid + _value;
        uint newTransactionID = transactionLists[_contractID].length;
        uint maxTotalCurrentTotalPayment;
        Transaction memory _transaction;

        // Set the Max Total Payment depending on the Sender & Expiry date 
        if(msg.sender == _contract.seller && currentTime < _contract.expiryDate){
           
            uint totalContractTime = _contract.expiryDate - _contract.startDate;
            uint elapsedContractTime = currentTime - _contract.startDate;
            uint percentageOfElapsedTime = (elapsedContractTime * 100) / totalContractTime;
            uint percentagePayable = (percentageOfElapsedTime * _contract.speed)/ 100;
            maxTotalCurrentTotalPayment = (percentagePayable * _contract.totalAmount) / 100;
            
        } else {
            maxTotalCurrentTotalPayment = _contract.totalAmount;
        }

        // BASIC CHECKS: ID, VALUE, STATUS, SENDER, 
        require(_contractID >= 0 && _contractID < contractCount, "The contract ID must be valid");
        require(_value > 0, "Amount to Pay must be more than 0 CPTokens");
        require(totalPayment <= _contract.totalAmount, "Total amount paid must not be more than the total value of PaymentContract");
        require(maxTotalCurrentTotalPayment >= _contract.amountPaid + _value, "The Contract cannot exceed the maximum amount allowed by the speed.");
        require( _contract.status == contractStatus.ACCEPTED || _contract.status == contractStatus.MISSING_PAYMENT, "The contract status must allow for payment");
        require(_contract.seller == msg.sender || _contract.buyer == msg.sender || owner == msg.sender, "Only Buyer, Seller or ColPay can make transactions in a contract");

        // ONLY CONSIDER THE DAYS TO OPEN IF THE SELLER IS THE SENDER
        if(msg.sender == _contract.seller){
            require(currentTime > DateTimeLibrary.DateTimeLibrary.addDays(_contract.startDate, _contract.daysToOpen), "Enough days have to have past in order for the contract to allow for transactions");
        } 

        // CHECK IF THERE IS ENOUGH BALANCE FOR SUCCESFUL TRANSACTION
        if (cpToken.balanceOf(_contract.buyer) < _value){
            _contract.status = contractStatus.MISSING_PAYMENT;
            emit PaymentContractStatusUpdate(_contractID, msg.sender, contractStatus.MISSING_PAYMENT);
            //updatePaymentContractStatus(_contractID, contractStatus.MISSING_PAYMENT);
            _transaction = Transaction(currentTime, _contractID, _value, false);

            changeAccountBlockedStatus(_contract.buyer, _contractID, newTransactionID, true);

        } else {

            if(isBlocked[_contract.buyer]){

                bool hasOtherMissingPayments = false;

                for (uint i = 0; i < paymentContractsHeldPerAddress[_contract.buyer].length; i++){
                    if(_contractID != i && paymentContracts[i].status == contractStatus.MISSING_PAYMENT ){
                          hasOtherMissingPayments = true;
                      }
                }
                if (!hasOtherMissingPayments) {
                    changeAccountBlockedStatus(_contract.buyer, _contractID, newTransactionID, false);
                }       
            }

            _transaction = Transaction(currentTime, _contractID, _value, true);

            // Update the buyers total debt
            incurredDebt[_contract.buyer] = incurredDebt[_contract.buyer] + _contract.totalAmount;

            // Make transaction of cpTokens
            cpToken.transferFrom(_contract.buyer, _contract.seller, _value);

            // Update the amount of the contract paid
            _contract.amountPaid = totalPayment;

            // Update contract status only if necessary
            if(totalPayment == _contract.totalAmount){
                //updatePaymentContractStatus(_contractID, contractStatus.FULFILLED);
                _contract.status = contractStatus.FULFILLED;
                emit PaymentContractStatusUpdate(_contractID, msg.sender, contractStatus.FULFILLED);
                emit PaymentContractFulfilled(_contractID, _contract.name, _contract.totalAmount, _contract.amountPaid, _contract.buyer, _contract.seller, _contract.startDate, _contract.expiryDate, _contract.daysToOpen, _contract.speed, _contract.status);
            } else if (_contract.status == contractStatus.MISSING_PAYMENT){
                //updatePaymentContractStatus(_contractID, contractStatus.ACCEPTED);
                _contract.status = contractStatus.ACCEPTED;
                emit PaymentContractStatusUpdate(_contractID, msg.sender, contractStatus.ACCEPTED);
            }
        }

        // UPDATE STATE VARIABLES WITH TRANSACTION
        transactionLists[_contractID].push(_transaction);
        paymentContracts[_contractID] = _contract;
         
        emit TransactionMade(currentTime, _contractID, _value, _transaction.successful);

    }

}
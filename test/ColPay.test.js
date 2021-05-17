const { assert } = require('chai');

const CPToken = artifacts.require('CPToken')
const ColPay = artifacts.require('ColPay')
const DateTimeLibrary = artifacts.require('DateTimeLibrary')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
  }

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function toSolidityDate(date){
  return  Math.floor(date / 1000)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  contract('ColPay', ([owner, buyer, seller_1, seller_2, buyer_2, buyer_3, buyer_4]) => {
    let cpToken, colPay, dateTimeLibrary;

    before(async () => {
        // Load Contracts
        dateTimeLibrary = await DateTimeLibrary.new()
        cpToken = await CPToken.new()
        colPay = await ColPay.new(cpToken.address)
    
        // Transfer all ColPay Tokens tokens to ColPay (1 million)
        await cpToken.setOwner(colPay.address)

        // Send tokens to buyer and seller accounts
        await colPay.issueTokens(tokens('100'), buyer, { from: owner })
        await colPay.issueTokens(tokens('100'), seller_1, { from: owner })
        await colPay.issueTokens(tokens('100'), seller_2, { from: owner })
        
    });

    describe('CPTokens deployment', async () => {
      it('Has correct Name', async () => {
        const name = await cpToken.name()
        assert.equal(name, 'ColPay Token')
      })
    })

    describe('ColPay deployment', async () => {
      it('Has correct Name', async () => {
        const name = await colPay.name()
        assert.equal(name, 'Payment Fragmentation Service')
      })

      it('Has correct Balance', async () => {
          let balance = await cpToken.balanceOf(colPay.address)
          assert.equal(balance.toString(), (tokens('999700')).toString())
        })
    })

    describe('New Accounts Registration', async () => {

      it('Issues Correct Number of Tokens to Buyer', async () => {
        let balance = await cpToken.balanceOf(buyer)
        assert.equal(balance.toString(), tokens('100'))
      })

      it('Issues Correct Number of Tokens to Sellers', async () => {
        let balance_1 = await cpToken.balanceOf(seller_1)
        let balance_2 = await cpToken.balanceOf(seller_2)
        assert.equal(balance_1.toString(), tokens('100'))
        assert.equal(balance_2.toString(), tokens('100'))

      })
    })

    describe('Payment Contracts', async () => {

      let firstContract, contractCount, firstContractID
      let createdTime_JS = Date.now()
      let expiryTime_JS = addDays(createdTime_JS, 40)

      before(async () => {
        
        firstContract = await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(createdTime_JS), toSolidityDate(expiryTime_JS), 10, 100, false,  { from: buyer })
        contractCount = await colPay.contractCount()
        firstContractID = contractCount.toNumber()-1
        
    });

      it('Creates New Payment Contracts Correctly both from Seller and Buyer side', async () => {
        // SUCCESS
        assert.equal(contractCount, 1)
        const event = firstContract.logs[0].args
        assert.equal(event.id.toNumber(), contractCount.toNumber() - 1, 'Id is not correct')
        assert.equal(event.name, "Test", 'Name is not correct')
        assert.equal(event.totalAmount, tokens('10'), 'Total Amount is not correct')
        assert.equal(event.amountPaid, '0', 'Amount Paid is not correct')
        assert.equal(event.buyer, buyer, 'Buyer address is not correct')
        assert.equal(event.seller, seller_1, 'Seller Address is correct')
        assert.equal(event.startDate, toSolidityDate(createdTime_JS), 'Start Date is not correct')
        assert.equal(event.expiryDate, toSolidityDate(expiryTime_JS), 'Expiry Date is not correct')
        assert.equal(event.daysToOpen.toNumber(), 10, 'Days to Open is not correct')
        assert.equal(event.speed.toNumber(), 100, 'Speed is not correct')
        assert.equal(event.contractStatus, 'NOT_REVIEWED', 'Status is not correct')
        assert.equal(event.createdBySeller, false, 'Created by seller (yes/no) is not correct')
      })

      it('Rejects Non-Valid Contracts: \n'+
          '        -> Negative Value\n'+
          '        -> Expired Before Current Time\n'+
          '        -> Expired Before Creation Time\n'+
          '        -> Do not Allow for Early Partial Payment\n'+
          '        -> Buyer Address = Seller Address\n'+
          '        -> Stops Accounts with Missing Payments from creating contracts'
          , async () => {
        // FAILURE: Negative total amount
        await colPay.createPaymentContract("Test", tokens('-10'), seller_1, toSolidityDate(createdTime_JS), toSolidityDate(expiryTime_JS), 10, 100, false,  { from: buyer }).should.be.rejected
        // FAILURE: Finished already
        await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(addDays(createdTime_JS, -20)), toSolidityDate(addDays(createdTime_JS, -10)), 10, 100, false,  { from: buyer }).should.be.rejected
        // FAILURE: Finishes before starting
        await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(addDays(createdTime_JS, 20)), toSolidityDate(addDays(createdTime_JS, 1)), 10, 100, false,  { from: buyer }).should.be.rejected
        // FAILURE: Has invalid Speed
        await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(createdTime_JS), toSolidityDate(expiryTime_JS), 10, 400, false,  { from: buyer }).should.be.rejected
        // FAILURE: Does not allow for early payment
        await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(createdTime_JS), toSolidityDate(expiryTime_JS), 40, 100, false,  { from: buyer }).should.be.rejected
        // FAILURE: Buyer = seller
        await colPay.createPaymentContract("Test", tokens('10'), buyer, toSolidityDate(createdTime_JS), toSolidityDate(expiryTime_JS), 10, 100, false,  { from: buyer }).should.be.rejected
        
        // FAILURE: Created by blocked buyer
        await colPay.issueTokens(tokens('10'), buyer_2, { from: owner })
        let partiallyPayableContract = await colPay.createPaymentContract("Test", tokens('8'), seller_1, toSolidityDate(addDays(createdTime_JS, -20)), toSolidityDate(addDays(createdTime_JS, 20)), 10, 100, false,  { from: buyer_2 })
        let partiallyPayableContractID = await colPay.contractCount()-1

        // Buyer initially has enough funds to pay the contract
        await colPay.acceptPaymentContract(partiallyPayableContractID, {from: seller_1})

        // Later they transfer the funds to someone else out of their own initiative
        let buyerBalance = await cpToken.balanceOf(buyer_2)
        await cpToken.transfer(seller_2, buyerBalance, {from: buyer_2})
          
        // Before transaction buyer is not blocked
        let blocked = await colPay.isBlocked(buyer_2)
        assert.equal(blocked, false, 'Buyer is not blocked')
          
        // Seller Requests Transaction
        await colPay.makeTransaction(partiallyPayableContractID, tokens('1'), {from: seller_1})

        blocked = await colPay.isBlocked(buyer_2)
        assert.equal(blocked, true, 'Buyer is not blocked')


      })
      it('Allows Users to Accept/Reject Contracts:\n'+
         '        -> Only Contract Recipient can Accept the Contract\n'+
         '        -> Can only Accept a Contract that the Buyer can Pay (including their other contracts)\n'+
         '        -> Can only Accept a Contract that has not been reviewed yet\n'+
         '        -> Can only Accept a Contract that has not expired'
         
         , async () => {

        // SUCCESS (with acceptance)
        let acceptance = await colPay.acceptPaymentContract(firstContractID, {from: seller_1})
        const event = acceptance.logs[0].args
        assert.equal(event.id.toNumber(), firstContractID, 'Id is not correct')
        assert.equal(event.statusUpdatedBy, seller_1, 'Status updated by is not correct')
        assert.equal(event.contractStatus, 'ACCEPTED', 'Contract Status is not correct')

        // FAILURE: Accept a contract that exceeds current balance of buyer
        let secondContract = await colPay.createPaymentContract("Test", tokens('1000'), seller_1, toSolidityDate(createdTime_JS), toSolidityDate(expiryTime_JS), 10, 100, false,  { from: buyer })
        let secondContractID = secondContract.logs[0].args.id
        await colPay.acceptPaymentContract(secondContractID, {from: seller_1}).should.be.rejected
        // FAILURE: Accept a contract from an address different than the recipient
        let thirdContract = await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(createdTime_JS), toSolidityDate(expiryTime_JS), 10, 100, false,  { from: buyer })
        let thirdContractID = thirdContract.logs[0].args.id
        await colPay.acceptPaymentContract(thirdContractID, {from: buyer}).should.be.rejected
        
        let rejection = await colPay.rejectPaymentContract(thirdContractID, {from: seller_1})

        // FAILURE: Accept a contract with an invalid status
        await colPay.acceptPaymentContract(thirdContractID, {from: seller_1}).should.be.rejected

        // SUCCESS (with rejection)
        const rejection_event = rejection.logs[0].args
        assert.equal(rejection_event.id.toNumber(), thirdContractID.toNumber(), 'Id is not correct')
        assert.equal(rejection_event.statusUpdatedBy, seller_1, 'Status updated by is not correct')
        assert.equal(rejection_event.contractStatus, 'REJECTED', 'Contract Status is not correct')

        // FAILURE: Reject a contract with an invalid status
        await colPay.rejectPaymentContract(firstContractID, {from: seller_1}).should.be.rejected

        // FAILURE: Reject a contract from an address different than the recipient
        let fourthContract = await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(createdTime_JS), toSolidityDate(expiryTime_JS), 10, 100, false,  { from: buyer })
        let fourthContractID = fourthContract.logs[0].args.id
        await colPay.rejectPaymentContract(fourthContractID, {from: seller_2}).should.be.rejected

        // FAILURE: Accepting an expired contract 
        let expiredContract = await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(addDays(createdTime_JS, -20)), toSolidityDate(Date.now()+2000), 10, 100, false,  { from: buyer })
        let expiredContractID = await colPay.contractCount()-1

        // Wait for the contract to expire
        await sleep(5000);

        await colPay.acceptPaymentContract(expiredContractID, {from: seller_1}).should.be.rejected

        
      })

      it('Makes Transactions Correctly\n'+
         '        -> Unlocks Correct Amount for Seller to Request in Transaction at a given time\n'+
         '        -> Stops only Seller from Making a Transaction before the day the contract is unlocked\n'+
         '        -> Stops Transactions that Exceed Contract Value\n'+
         '        -> Adjusts Balance of Buyer and Seller correctly\n'+
         '        -> Updates the status of the Contract to: Missing Paymnet or Fulfilled if necessary'

      , async () => {
        // Success create a contract that allows for payment and make a transaction

        let partiallyPayableContract = await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(addDays(createdTime_JS, -20)), toSolidityDate(addDays(createdTime_JS, 20)), 10, 100, false,  { from: buyer })
        let partiallyPayableContractID = await colPay.contractCount()-1
        await colPay.acceptPaymentContract(partiallyPayableContractID, {from: seller_1})

        let nonPayableContract = await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(addDays(createdTime_JS, -5)), toSolidityDate(addDays(createdTime_JS, 20)), 10, 100, false,  { from: buyer })
        let nonPayableContractID = await colPay.contractCount()-1
        await colPay.acceptPaymentContract(nonPayableContractID, {from: seller_1})

        // SUCCESS
        let beforeTransactionTime = toSolidityDate(Date.now())
        let firstTransaction = await colPay.makeTransaction(partiallyPayableContractID, tokens('1'), {from: seller_1})
        let afterTransactionTime = toSolidityDate(Date.now())
        const firtTransactionEvent = firstTransaction.logs[1].args

        assert.equal(firtTransactionEvent.value, tokens('1'), 'Value is not correct')
        assert.equal(firtTransactionEvent.successful, true, 'Value is not correct')
        assert.equal(firtTransactionEvent.contractID, partiallyPayableContractID, 'Contract is not correct')
        assert.equal(firtTransactionEvent.date.toNumber() >= beforeTransactionTime && firtTransactionEvent.date.toNumber() <= afterTransactionTime, true, 'Transaction Date time is not correct')

        let seller_1Balance = await cpToken.balanceOf(seller_1)
        let buyerBalance = await cpToken.balanceOf(buyer)

        assert.equal(seller_1Balance.toString(), tokens('101'), "Seller Balance is not correct")
        assert.equal(buyerBalance.toString(), tokens('99'), "Buyer Balance is not correct")

        // FAILURE: Seller requests Payment to early
        await colPay.makeTransaction(nonPayableContractID, tokens('1'), {from: seller_1}).should.be.rejected
        // FAILURE: Excess payment from seller
        await colPay.makeTransaction(partiallyPayableContractID, tokens('6'), {from: seller_1}).should.be.rejected
        // FAILURE: Attempts a payment larger than balance
        await colPay.makeTransaction(partiallyPayableContractID, tokens('20'), {from: buyer}).should.be.rejected

        // SUCCESS: Finishing the contract early
        await colPay.makeTransaction(partiallyPayableContractID, tokens('9'), {from: buyer})

        seller_1Balance = await cpToken.balanceOf(seller_1)
        buyerBalance = await cpToken.balanceOf(buyer)

        assert.equal(seller_1Balance.toString(), tokens('110'), "Seller Balance is not correct")
        assert.equal(buyerBalance.toString(), tokens('90'), "Buyer Balance is not correct")

        // SUCCESS: Buyer decides to pay early
        await colPay.makeTransaction(nonPayableContractID, tokens('2'), {from: buyer})

        seller_1Balance = await cpToken.balanceOf(seller_1)
        buyerBalance = await cpToken.balanceOf(buyer)

        assert.equal(seller_1Balance.toString(), tokens('112'), "Seller Balance is not correct")
        assert.equal(buyerBalance.toString(), tokens('88'), "Buyer Balance is not correct")

        // Updates the status of the Contract to: Missing Paymnet or Fulfilled if necessary
        let transaction = await colPay.makeTransaction(nonPayableContractID, tokens('8'), {from: buyer})
        let status = transaction.logs[0].args.contractStatus
        assert.equal(status, 'FULFILLED', "Contract Status not updated correctly")

        // Missing payment status

        await colPay.issueTokens(tokens('10'), buyer_3, { from: owner })
        
        let missingPaymentContract = await colPay.createPaymentContract("Test", tokens('8'), seller_1, toSolidityDate(addDays(createdTime_JS, -20)), toSolidityDate(addDays(createdTime_JS, 20)), 10, 100, false,  { from: buyer_3 })
        let missingPaymetContractID = await colPay.contractCount()-1

        // Buyer initially has enough funds to pay the contract
        await colPay.acceptPaymentContract(missingPaymetContractID, {from: seller_1})

        // Later they transfer the funds to someone else out of their own initiative
        buyerBalance = await cpToken.balanceOf(buyer_3)
        await cpToken.transfer(seller_2, buyerBalance, {from: buyer_3})
          
        // Seller Requests Transaction
        transaction = await colPay.makeTransaction(missingPaymetContractID, tokens('1'), {from: seller_1})
        status = transaction.logs[0].args.contractStatus
        assert.equal(status, 'MISSING_PAYMENT', "Contract Status not updated correctly")

      })

      it('Handles Expired Contracts and Missing Payments\n'+
         '        -> Detects Expired Contracts\n'+
         '        -> Executes the Final Payment\n'+
         '        -> Updates Status\n'+
         '        -> Checks for Missing Payments and Requests Them\n'+
         '        -> Unblocks Addresses if the no longer have missing payments'
      
      , async () => {
        // SETUP AN EXPIRED CONTRACT
        let expiredContract = await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(addDays(createdTime_JS, -20)), toSolidityDate(Date.now()+5000), 10, 100, false,  { from: buyer })
        let expiredContractID = await colPay.contractCount()-1
        await colPay.acceptPaymentContract(expiredContractID, {from: seller_1})

        // SETUP A MISSED PAYMENT CONTRACT WHICH BUYER CAN NOW PAY
        // Wait for the contract to expire
        await sleep(6000)

        await colPay.issueTokens(tokens('20'), buyer_4, { from: owner })

        let partiallyPayableContract = await colPay.createPaymentContract("Test", tokens('10'), seller_1, toSolidityDate(addDays(createdTime_JS, -20)), toSolidityDate(addDays(createdTime_JS, 20)), 10, 100, false,  { from: buyer_4 })
        let partiallyPayableContractID = await colPay.contractCount()-1

        // Buyer initially has enough funds to pay the contract
        await colPay.acceptPaymentContract(partiallyPayableContractID, {from: seller_1})

        // Later they transfer the funds to someone else out of their own initiative
        let buyerBalance = await cpToken.balanceOf(buyer_4)
        await cpToken.transfer(seller_2, buyerBalance, {from: buyer_4})
        await colPay.makeTransaction(partiallyPayableContractID, tokens('1'), {from: seller_1})

        await colPay.issueTokens(tokens('20'), buyer_4, { from: owner })

        let blocked = await colPay.isBlocked(buyer_4)
        assert.equal(blocked, true, 'Buyer is not blocked')

        await colPay.checkForRequiredPayments({from: owner})
        // Buyer has to pay expired contract

        blocked = await colPay.isBlocked(buyer_4)
        assert.equal(blocked, false, 'Buyer is blocked')

        
      })
    })

  })
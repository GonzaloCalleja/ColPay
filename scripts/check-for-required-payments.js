const { projectId, mnemonic, deployer } = require('../secrets.json');
const ColPay = artifacts.require('ColPay')

module.exports = async function(callback) {

    let colPay = await ColPay.deployed()
    let contractCount = await colPay.contractCount()
    let acceptedContracts = []
    let missingPaymentContracts = []

    for(i=0; i<contractCount; i++){
        let contract = await colPay.paymentContracts(i)
        if(contract.status.toString() == ColPay.contractStatus.ACCEPTED.toString()){
            acceptedContracts.push(contract)
        }else if (contract.status.toString() == ColPay.contractStatus.MISSING_PAYMENT.toString()){
            missingPaymentContracts.push(contract)
        }
    }

    await colPay.checkForRequiredPayments({from: deployer})

    contractCount = await colPay.contractCount()

    if(acceptedContracts.length > 0){
        console.log("EXPIRED CONTRACTS:")
    } else {
        console.log("NO EXPIRED CONTRACTS DETECTED")
    }

    for(i=0; i<acceptedContracts.length; i++){
        let contract = await colPay.paymentContracts(acceptedContracts[i].id)
        let totalTransactions = await colPay.getTransactionNumber(acceptedContracts[i].id)

        if(totalTransactions > 0){
            let lastTransaction = await colPay.transactionLists(acceptedContracts[i].id, totalTransactions-1)

            if (contract.status.toString() == ColPay.contractStatus.MISSING_PAYMENT.toString()){
                console.log(" - Contract:", contract.name.toString() ,"with ID", contract.id.toString(), "has expired, but the final payment worth", web3.utils.fromWei(lastTransaction.value.toString(), 'ether') , "CP Tokens was UNSUCCESFUL.")
            } else if (contract.status.toString() == ColPay.contractStatus.FULFILLED.toString()){
                console.log(" - Contract", contract.name.toString() ,"with ID", contract.id.toString(), "has expired, the final payment worth", web3.utils.fromWei(lastTransaction.value.toString(), 'ether'), " CPTokens was SUCCESFUL.")
            }
        }
    }

    if(missingPaymentContracts.length > 0){
        console.log('\nCONTRACTS WITH MISSED PAYMENTS:')
    } else {
        console.log('\nNO CONTRACTS WITH MISSED PAYMENTS:\n')
    }

    for(i=0; i<missingPaymentContracts.length; i++){
        let contract = await colPay.paymentContracts(missingPaymentContracts[i].id)
        let totalTransactions = await colPay.getTransactionNumber(missingPaymentContracts[i].id)

        if(totalTransactions > 0){
            let lastTransaction = await colPay.transactionLists(missingPaymentContracts[i].id, totalTransactions-1)

            if (contract.status.toString() == ColPay.contractStatus.MISSING_PAYMENT.toString()){
                console.log(" - Contract", contract.name.toString() ,"with ID ", contract.id.toString(), "has a missing payment worth", web3.utils.fromWei(lastTransaction.value.toString(), 'ether') , "CP Tokens, another attempt was made at fulfilling the payment, but it was UNSUCCESFUL.")
            } else if (contract.status.toString() == ColPay.contractStatus.ACCEPTED.toString()){
                console.log(" - Contract", contract.name.toString() ,"with ID ", contract.id.toString(), "has a missing payment worth", web3.utils.fromWei(lastTransaction.value.toString(), 'ether') , "CP Tokens, another attempt was made at fulfilling the payment, and it was SUCCESFUL.")
            }
        }
    }

    callback()
}

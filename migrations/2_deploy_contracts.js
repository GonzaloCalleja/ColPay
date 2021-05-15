const CPToken = artifacts.require('CPToken')
const ColPay = artifacts.require('ColPay')

module.exports = async function(deployer, network, accounts) {
  // Deploy ColPay Token
  await deployer.deploy(CPToken)
  const cpToken = await CPToken.deployed()
  
  
  // Deploy Contract
  await deployer.deploy(ColPay, cpToken.address)
  const colPay = await ColPay.deployed()

  // Transfer all ColPay Tokens tokens to ColPay (1 million)
  await cpToken.transfer(colPay.address, '1000000000000000000000000')

  // Transfer 100 ColPay Tokens to initial buyer account
  await colPay.requestTokens('100000000000000000000', {from: accounts[1]})

  // Transfer 10 ColPay Tokens to initial seller account
  await colPay.requestTokens('10000000000000000000', {from: accounts[2]})
}
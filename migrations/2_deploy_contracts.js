const CPToken = artifacts.require('CPToken')
const ColPay = artifacts.require('ColPay')
const DateTimeLibrary = artifacts.require('DateTimeLibrary')

module.exports = async function(deployer, network, accounts) {
  
  // Deploy DateTimeLibrary
  await deployer.deploy(DateTimeLibrary)

  // Deploy ColPay Token
  await deployer.deploy(CPToken)
  const cpToken = await CPToken.deployed()
  
  // Deploy Contract
  await deployer.deploy(ColPay, cpToken.address)
  const colPay = await ColPay.deployed()

  // Set ColPay as Owner of all ColPay Tokens (1 million)
  await cpToken.setOwner(colPay.address)
  //await cpToken.transfer(colPay.address, '1000000000000000000000000')

  // Transfer 100 ColPay Tokens to initial accounts
  await colPay.issueTokens('100000000000000000000', accounts[1])
  await colPay.issueTokens('100000000000000000000', accounts[2])
}

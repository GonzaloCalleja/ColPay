const ColPay = artifacts.require('ColPay')

module.exports = async function(deployer, network, accounts) {
  // Deploy Contract
  await deployer.deploy(ColPay)
  //const daiToken = await DaiToken.deployed()

  // Call any necessary functions on contract migration
  //await ColPay.aFunction()
}

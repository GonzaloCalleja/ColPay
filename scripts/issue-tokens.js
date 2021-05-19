const { projectId, mnemonic, deployer } = require('../secrets.json');
const ColPay = artifacts.require('ColPay')

module.exports = async function(callback) {

  let colPay = await ColPay.deployed()

  var account = process.argv[4]
  var tokens = process.argv[5]

  await colPay.issueTokens(web3.utils.toWei(tokens, 'ether'), account, {from: deployer})

  console.log(tokens, "CP Tokens Issued to Account: ", account)

  callback()
}

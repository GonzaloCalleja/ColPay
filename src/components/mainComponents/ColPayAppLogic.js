// Library Elements
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Smart Contract
import ColPay from '../../abis/ColPay.json'
import CPToken from '../../abis/CPToken.json'
import Web3 from 'web3'

// Components
import Drawer from './Drawer'
import MyAccount from './MyAccount'
import ContractsOverview from './ContractsOverview'
import ContractsReview from './ContractsReview'
import TransactionsOverview from './TransactionsOverview'
import RecipientsOverview from './RecipientsOverview'
import ContractCreate from './ContractCreate'
import RequestTransaction from './RequestTransaction'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}))

const ColPayAppLogic = ({paths, onLoadAccount, mobileOpen, handleDrawerToggle, AccountsToName, accountName}) => {

  const classes = useStyles()

  const[colPay, setColPay] = useState({})
  const[cpToken, setCPToken] = useState({})

  const[cpTokenBalance, setCPTokenBalance] = useState(0)
  const[account, setAccount] = useState('')
  //const[contractCount, setContractCount] = useState(0)
  const[contracts, setContracts] = useState([])
  const[isBlocked, setIsBlocked] = useState(false)
  const[incurredDebt, setIncurredDebt] = useState(0)
  const[potentialDebt, setPotentialDebt] = useState(0)

  const[balanceEther, setBalanceEther] = useState(0)
  const[incurredDebtEther, setIncurredDebtEther] = useState(0)
  const [potentialDebtEther, setPotentailDebtEther] = useState(0)

  const[loading, setLoading] = useState(true)
  const[reload, setReload] = useState(true)

  const statusValues = useState(
    {
      NotReviewed: 'Not Reviewed', 
      Rejected: 'Rejected', 
      Accepted: 'Accepted', 
      Fulfilled: 'Fulfilled', 
      MissingPayments: 'Missing Payment'
    }
    )

    const statusEnumValues =
      {
        0: 'Not Reviewed', 
        1: 'Rejected', 
        2: 'Accepted', 
        3: 'Fulfilled', 
        4: 'Missing Payment'
      }


  // Function called every render. Or whenever change in a value of the array

  useEffect(()=>{

    const getBlockChainData = async ()=> {
      await loadWeb3()
      
      const [colPay, cpToken] = await loadSmartContracts()
      setColPay(colPay)
      setCPToken(cpToken)

      const accounts = await window.web3.eth.getAccounts()
      setAccount(accounts[0])
      onLoadAccount(accounts[0])
    }

    getBlockChainData()
    setLoading(false)

  }, [])

  useEffect(()=>{

    if(account){

      let getAccountData = async () =>{

        //console.log("trigger")

        const cpTokenBalance = await cpToken.methods.balanceOf(account).call()
        setCPTokenBalance(cpTokenBalance)
        setBalanceEther(Math.round(window.web3.utils.fromWei(cpTokenBalance.toString(), 'Ether') * 100)/100)  
        
        const contractCount = await colPay.methods.getContractNumber(account).call()
        //setContractCount(contractCount)

        let contractsToUpdate = []

        for(let id = 0; id < contractCount; id++){
          const contractID = await colPay.methods.paymentContractsHeldPerAddress(account, id).call()
          const contract = await colPay.methods.paymentContracts(contractID).call()

          contract.accountName = accountName

          contract.totalEther = Math.round(window.web3.utils.fromWei(contract.totalAmount.toString(), 'Ether') * 100)/100
          contract.paidEther = Math.round(window.web3.utils.fromWei(contract.amountPaid.toString(), 'Ether') *100)/100

          const status = statusEnumValues[contract.status]
          contract.statusName = status

          const start = new Date(contract.startDate*1000)
          const startMonth = start.getMonth() +1
          const startDate = start.getDate() + '/' + startMonth +  '/' + start.getFullYear()
          contract.startDateFormat = startDate
          
          const expires = new Date(contract.expiryDate*1000)
          const endMonth = expires.getMonth() +1
          const expiryDate = expires.getDate() + '/' + endMonth +  '/' + expires.getFullYear()
          contract.expiryDateFormat = expiryDate
          
          const transactionsCount = await colPay.methods.getTransactionNumber(contractID).call()
          const transactions = []

          for (let key = 0; key < transactionsCount; key++){
            const contractTransactions = await colPay.methods.transactionLists(contractID, key).call()
            const date = new Date(contractTransactions.date*1000)
            const dateMonth = date.getMonth() +1
            const dateFormat = date.getDate() + '/' + dateMonth +  '/' + date.getFullYear()

            contractTransactions.dateFormat = dateFormat
            contractTransactions.valueEther = window.web3.utils.fromWei(contractTransactions.value.toString(), 'Ether')

            transactions.push(contractTransactions)
          }
          contract.transactions = transactions

          let recipient, recipientName
          if (contract.createdBySeller){
            recipient = contract.buyer
            recipientName = AccountsToName[0][contract.buyer]
          }else {
            recipient = contract.seller
            recipientName = AccountsToName[0][contract.seller] 
          }
          contract.recipient = recipient
          contract.recipientName = recipientName

          let partner, partnerName
          if (account == contract.seller){
            partner = contract.buyer
            partnerName = AccountsToName[0][contract.buyer]
          }else {
            partner = contract.seller
            partnerName = AccountsToName[0][contract.seller] 
          }
          contract.partner = partner
          contract.partnerName = partnerName

          contractsToUpdate.push(contract)
        }

        setContracts(contractsToUpdate)

        const isBlocked = await colPay.methods.isBlocked(account).call()
        setIsBlocked(isBlocked)

        const incurredDebt = await colPay.methods.incurredDebt(account).call()
        setIncurredDebt(incurredDebt)
        setIncurredDebtEther(Math.round(window.web3.utils.fromWei(incurredDebt.toString(), 'Ether')*100)/100)

        const potentialDebt = await colPay.methods.potentialDebt(account).call()
        setPotentialDebt(potentialDebt)
        setPotentailDebtEther(Math.round(window.web3.utils.fromWei(potentialDebt.toString(), 'Ether')*100)/100)

      }

      getAccountData()

    }

  }, [account, reload])

  const loadWeb3 = async()=>{
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadSmartContracts = async()=> {

    const networkId = await window.web3.eth.net.getId()

    let colPay, cpToken

    // Load CP Tokens
    try {
      cpToken = new window.web3.eth.Contract(CPToken.abi, CPToken.networks[networkId].address)
    } catch (e) {
      window.alert('CPToken contract not deployed to detected network.')
      console.error(e)
    }
    // Load Smart Contract(s)
    try{
      colPay = new window.web3.eth.Contract(ColPay.abi, ColPay.networks[networkId].address)
    } catch(e){
      window.alert('Contract not deployed to detected network.')
      console.error(e)
    }
    return [colPay, cpToken]
  }

  const createPaymentContract = async (name, totalAmount, recipient, start, expire, daysToOpen, speed, createdBySeller) => {

    setLoading(true)

    colPay.methods.createPaymentContract(name, totalAmount, recipient, start, expire, daysToOpen, speed, createdBySeller).send({from: account})

    .once('receipt', (receipt) => {
      setLoading(false)
      setReload(!reload)
    })

  }

  const acceptContract = async (id)=>{
    setLoading(true)

    colPay.methods.acceptPaymentContract(id).send({from: account})

    .once('receipt', (receipt) => {
      setLoading(false)
      setReload(!reload)
    })
  }

  const rejectContract = async (id)=>{
    setLoading(true)

    colPay.methods.rejectPaymentContract(id).send({from: account})

    .once('receipt', (receipt) => {
      setLoading(false)
      setReload(!reload)
    })
  }

  const makeTransaction = async (id, value)=>{
    setLoading(true)

    colPay.methods.makeTransaction(id, value).send({from: account})

    .once('receipt', (receipt) => {
      setLoading(false)
      setReload(!reload)
    })
  }

  return (
    <div className={classes.root}>
      
      <Drawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} paths={paths}/>

      <Switch>
      { paths[0].appMain === window.location.pathname && <Route render={()=>(<Redirect to={paths[0].appMyAccount}/>)} /> }
        <Route exact path={paths[0].appMyAccount}>
          <MyAccount 
            account={account} 
            contracts={contracts} 
            balance={balanceEther} 
            isBlocked={isBlocked} 
            incurredDebt={incurredDebtEther} 
            potentialDebt={potentialDebtEther}
            statusValues={statusValues}
            paths={paths}
          />
        </Route>

        <Route exact path={paths[0].appReviewContract} component={()=>{
          if (loading){
            return (<Typography variant='h2'>Loading...</Typography>)
          }else {
            return (
              <ContractsReview 
                contracts={contracts} 
                statusValues={statusValues}
                account = {account}
                onAccept = {acceptContract}
                onReject = {rejectContract}
                isBlocked={isBlocked}
              />
            )
          }
        }} /> 

        <Route exact path={paths[0].appCreateContract} component={()=>{
          if (loading){
            return (<Typography variant='h2'>Loading...</Typography>)
          }else {
            return (
              <ContractCreate 
              onCreateContract={createPaymentContract} 
              isBlocked={isBlocked}
              AccountsToName={AccountsToName}
              account={account}
              />
            )
          }
        }} /> 

        <Route exact path={paths[0].appContractsOverview}>
             <ContractsOverview
                contracts={contracts} 
                statusValues={statusValues}
              />
        </Route> 

        <Route exact path={paths[0].appTransactions}>
             <TransactionsOverview
                contracts={contracts} 
                account={account}
              />
        </Route> 

        <Route exact path={paths[0].appRecipients}>
             <RecipientsOverview
                contracts={contracts} 
                statusValues={statusEnumValues}
              />
        </Route> 

        <Route exact path={paths[0].appRequest} component={()=>{
          if (loading){
            return (<Typography variant='h2'>Loading...</Typography>)
          }else {
            return (
              <RequestTransaction 
              onTransaction={makeTransaction}
              contracts={contracts} 
              statusValues={statusValues}
              />
            )
          }
        }} /> 

      </Switch>
    </div>
  );
}

export default ColPayAppLogic;

/*
Code for daily execution
const { EAC, Util } = require('@ethereum-alarm-clock/lib');
const moment = require('moment');

const web3 = Util.getWeb3FromProviderUrl('ws://localhost:8545');

const eac = new EAC(web3);

async function scheduleTransaction() {
    const receipt = await eac.schedule({
        toAddress: '0xe87529A6123a74320e13A6Dabf3606630683C029',
        windowStart: moment().add('1', 'day').unix() // 1 day from now
    });

    console.log(receipt);
}

scheduleTransaction();

*/

      /*
      // Can also fetch objects inside Blockchain
      // One Object:
      let variable = await colPay.methods.aMethod(this.state.userAddress).call()
      this.setState({ stateVariable: variable.toString() })

      // Several Objects:
      for (var i= 1; i <= aNumberForMappingLength; i++){
        const variable = await marketplace.methods.mappingVariable(i).call()
        this.setState({
          // adding to array
          array: [...this.state.array, variable]
        })
      }
      */
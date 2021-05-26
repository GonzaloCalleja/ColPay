import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ColPay from '../abis/ColPay.json'
import CPToken from '../abis/CPToken.json'
import Web3 from 'web3'
import Main from './Main.js'

//const { projectId, mnemonic, deployer } = require('../../secrets.json');

// you can pass a theme to useStyles() use theme object. [theme.breakpoints.up("sm")]:{ color: "cyan"} if the breakpoint of small is reached then cyan is color 
// more than one style -> import classNames library and passin a className object with the classes as arguments


//OVERRIDING THEME COLOR??
const useStyles = makeStyles({
  /*
  root: {
    backgroundColor: '#3a8f69',
    color: 'white',
    fontSize: '30px'
    // conditional statement based on a state variable -> AWESOMEEEE
    //color: props => props.color,
  },
  */
  root: {
    display: 'flex',
  }
});

const ColPayDashboard = ({onLoadAccount}) => {

  const[colPay, setColPay] = useState({})
  const[cpToken, setCPToken] = useState({})

  const[cpTokenBalance, setCPTokenBalance] = useState(0)
  const[account, setAccount] = useState('')
  //const[contractCount, setContractCount] = useState(0)
  const[contracts, setContracts] = useState([])
  const[isBlocked, setIsBlocked] = useState(false)
  const[incurredDebt, setIncurredDebt] = useState(0)
  const[potentialDebt, setPotentialDebt] = useState(0)

  const[loading, setLoading] = useState(true)
  const[reload, setReload] = useState(true)


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

      const getAccountData = async () =>{

        //console.log("trigger")

        const cpTokenBalance = await cpToken.methods.balanceOf(account).call()
        setCPTokenBalance(cpTokenBalance)
  
        
        const contractCount = await colPay.methods.getContractNumber(account).call()
        //setContractCount(contractCount)

        let contractsToUpdate = []

        for(let id = 0; id < contractCount; id++){
          const contractID = await colPay.methods.paymentContractsHeldPerAddress(account, id).call()
          const contract = await colPay.methods.paymentContracts(contractID).call()
          
          const transactionsCount = await colPay.methods.getTransactionNumber(contractID).call()
          const transactions = []

          for (let key = 0; key < transactionsCount; key++){
            const contractTransactions = await colPay.methods.transactionLists(contractID, key).call()
            transactions.push(contractTransactions)
          }
          
          contract.transactions = transactions

          contractsToUpdate.push(contract)
        }

        setContracts(contractsToUpdate)

        const isBlocked = await colPay.methods.isBlocked(account).call()
        setIsBlocked(isBlocked)

        const incurredDebt = await colPay.methods.incurredDebt(account).call()
        setIncurredDebt(incurredDebt)

        const potentialDebt = await colPay.methods.potentialDebt(account).call()
        setPotentialDebt(potentialDebt)

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

  // Expire

  return (
    <div className={useStyles().root}>
      <Grid container direction='column'>
        <Grid item container>
          <Grid item xs={4}/>
          <Grid>
            {loading 
            ? <Typography>Loading...</Typography> 
            : <Main 
                  onCreateContract={createPaymentContract}
                  account={account}
                  contracts={contracts}
                  onAccept={acceptContract}
                  onReject={rejectContract}
                  balance={cpTokenBalance}
                  incurredDebt={incurredDebt}
                  potentialDebt={potentialDebt}
                  isBlocked={isBlocked}
                  onTransaction={makeTransaction}
              />
            }
          </Grid>
          <Grid item xs={4}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default ColPayDashboard;

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
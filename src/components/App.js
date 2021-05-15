import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import ColPay from '../abis/ColPay.json';
import Navbar from './Navbar.js';
import Main from './Main.js';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // Loading data from metamask -> Code Provided by them
  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  // Loading data from the Blockchain metamask is connected to
  async loadBlockchainData() {
    const web3 = window.web3

    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})

    // Load Network
    const networkId = await web3.eth.net.getId()

    // Load Smart Contract(s)
    const colPayData = ColPay.networks[networkId]
    if (colPayData){
      const abi = ColPay.abi
      const address = ColPay.networks[networkId].address
      const colPay = new web3.eth.Contract(abi, address)

      // Store smart contract in state
      this.setState({ colPay })

      /*
      // Can also fetch objects inside Blockchain
      // One Object:
      let variable = await colPay.methods.aMethod(this.state.account).call()
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

    } else {
      window.alert('Contract not deployed to detected network.')
    }

    this.setState({loading: false})
  }

  constructor(props){
    super(props)
    this.state = {
      // Variables to be used in UI
      account: '0x0',
      loading: true,
      colPay: {}
    }

    // Binding the functions necessary for UI
    //this.functionName = this.functionName.bind(this)
  }

  // Functions go here:

  render() {
    // Variable to set the content to Main or Loading 
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main/>
    }

    return (
      <div>
        <Navbar/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

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
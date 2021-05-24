import AddContract from './AddContract'
import ContractList from './ContractList'
import AccountInfo from './AccountInfo'
import AddTransaction from './AddTransaction'
import { useState } from 'react';

const Main = ({account, onCreateContract, contracts, onAccept, onReject, balance, potentialDebt, incurredDebt, isBlocked, onTransaction})=> {

  const [showAddContract, setShowAddContract] = useState(false)
  const [showMaketransaction, setShowMaketransaction] = useState(false)

  return (
      <div>
        <AccountInfo account={account} balance={balance} potentialDebt={potentialDebt} incurredDebt={incurredDebt} isBlocked={isBlocked}/>
        <p>&nbsp;</p>
        <button style={{color: 'white', backgroundColor: showAddContract ? 'red' : 'green'}} onClick={()=>setShowAddContract(!showAddContract)}>
        {showAddContract ? 'Close Form' : 'Add Contract'}
        </button>
        <button style={{color: 'white', backgroundColor: showMaketransaction ? 'red' : 'green'}} onClick={()=>setShowMaketransaction(!showMaketransaction)}>
        {showMaketransaction ? 'Close Form' : 'Make Transaction'}
        </button>
        {showAddContract && <AddContract onCreateContract={onCreateContract}/>}
        {showMaketransaction && <AddTransaction onTransaction={onTransaction} contracts={contracts}/>}

        <p>&nbsp;</p>

        {
          contracts.length > 0
          ? <ContractList account={account} contracts={contracts} onAccept={onAccept} onReject={onReject}/>
          : <p className="text-center">No Contracts to Show</p> 
        }
      </div>
      
  );
}

export default Main;

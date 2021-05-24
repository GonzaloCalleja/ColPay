import AddContract from './AddContract'
import ContractList from './ContractList'
import AccountInfo from './AccountInfo'

const Main = ({account, onCreateContract, contracts, onAccept, onReject, balance, potentialDebt, incurredDebt, isBlocked})=> {

  return (
      <div id="content">
          <AccountInfo account={account} balance={balance} potentialDebt={potentialDebt} incurredDebt={incurredDebt} isBlocked={isBlocked}/>
          <AddContract onCreateContract={onCreateContract}/>
          <p>&nbsp;</p>
          <h2>Contracts</h2>
          {contracts.length > 0 && <ContractList account={account} contracts={contracts} onAccept={onAccept} onReject={onReject}/>}
      </div>
      
  );
}

export default Main;

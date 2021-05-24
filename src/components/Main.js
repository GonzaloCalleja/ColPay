import AddContract from './AddContract'
import ContractList from './ContractList'

const Main = ({account, onCreateContract, contracts, onAccept, onReject})=> {

  return (
      <div id="content">
          <AddContract onCreateContract={onCreateContract}/>
          <p>&nbsp;</p>
          <h2>Contracts</h2>
          {contracts.length > 0 && <ContractList account={account} contracts={contracts} onAccept={onAccept} onReject={onReject}/>}
      </div>
      
  );
}

export default Main;

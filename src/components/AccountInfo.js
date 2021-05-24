
const AccountInfo = ({account, potentialDebt, incurredDebt, balance, isBlocked}) => {
    return (
        <div className='col'>
            <h4>Acccount: {account}</h4>
            <h4>Balance: {window.web3.utils.fromWei(balance.toString(), 'Ether')} Eth</h4>
            <h4>Potential Debt: {window.web3.utils.fromWei(potentialDebt.toString(), 'Ether')} Eth</h4>
            <h4>Incurred Debt: {window.web3.utils.fromWei(incurredDebt.toString(), 'Ether')} Eth</h4>
            {isBlocked ? <h4>Blocked: Yes</h4> : <h4>Blocked: No</h4>}
            
        </div>
    )
}

export default AccountInfo

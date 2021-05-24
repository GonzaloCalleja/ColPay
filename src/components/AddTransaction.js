import { useState } from 'react'

const AddTransaction = ({onTransaction, contracts}) => {

    const [contractId, setContractId] = useState(0)
    const [value, setValue] = useState(0)

    const onSubmit = (e) => {

        e.preventDefault()

        if(value ===0 ){
            alert('Please complete the form to make a new transaction.')
            return
        }

        const etherValue = window.web3.utils.toWei(value.toString(), 'Ether')
    
        onTransaction(contractId, etherValue)

        setContractId('')
        setValue(0)
    }

    return (
        <div className='row'>
        <form onSubmit={onSubmit} className='content mr-auto ml-auto'>
            <div className ="mb-3 row">
                <label className="col-sm-4 col-form-label">Contract</label>
                <div className="col-sm-8">
                    <select 
                    className = "form-control"
                    value = {contractId}
                    onChange={ (e) => setContractId(e.target.value) } 
                    >
                       {contracts.map((contract, key)=>{

                            const statusValues = ['Not Reviewed', 'Rejected', 'Accepted', 'Fulfilled', 'Missing Payment']
                            const status = statusValues[contract.status]

                            if(status === statusValues[2] || status === statusValues[4]){
                                return <option key={key} value={contract.id}>{contract.name}</option> 
                            }
                       })} 
                    </select>
                </div>
            </div>
            <div className ="mb-3 row">
                <label className="col-sm-4 col-form-label">Value</label>
                <div className="col-sm-8">
                    <input 
                    className = "form-control"
                    type='number'
                    step='.000000000000000001'
                    min='0' 
                    value={value} 
                    onChange={ (e) => setValue(e.target.value) }
                    />
                </div>
            </div>
            <input type='submit' className="btn btn-primary" value='Make Transaction'/>
        </form>
        </div>
    )
}

export default AddTransaction
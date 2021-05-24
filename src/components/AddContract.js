import { useState } from 'react'

const AddContract = ({onCreateContract}) => {

    const [name, setName] = useState('')
    const [totalAmount, setTotalAmount] = useState(0)
    const [recipient, setRecipient] = useState('0x0')
    const [startDate, setStartDate] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [daysToOpen, setDaysToOpen] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [createdBySeller, setCreatedBySeller] = useState(false)

    const onSubmit = (e) => {

        e.preventDefault()

        if(!name || totalAmount ===0 || setRecipient ==='0x0' || startDate ===0 || expiryDate ===0 || daysToOpen ===0 || speed ===0){
            alert('Please complete the form to submit a new contract.')
            return
        }

        const totalPrice = window.web3.utils.toWei(totalAmount.toString(), 'Ether')

        const start = Math.floor(Date.parse(startDate) / 1000).toString()
        const expire = Math.floor(Date.parse(expiryDate) / 1000).toString()

        onCreateContract(name, totalPrice, recipient, start, expire, daysToOpen, speed, createdBySeller)

        setName('')
        setTotalAmount(0)
        setRecipient('0x0')
        setStartDate('')
        setExpiryDate('')
        setExpiryDate(0)
        setDaysToOpen(0)
        setSpeed(0)
        setCreatedBySeller(false)
    }

    return (
        <form onSubmit={onSubmit}>
            <div className ="mb-3 row">
                <label className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                    <input 
                    className = "form-control"
                    type='text' 
                    placeholder='Add Contract Name' 
                    value={name} 
                    onChange={ (e) => setName(e.target.value) } 
                    />
                </div>
            </div>
            <div className ="mb-3 row">
                <label className="col-sm-4 col-form-label">Value</label>
                <div className="col-sm-8">
                    <input 
                    className = "form-control"
                    type='number'
                    min='0' 
                    value={totalAmount} 
                    onChange={ (e) => setTotalAmount(e.target.value) }
                    />
                </div>
            </div>
            <div className ="mb-3 row">
                <label className="col-sm-4 col-form-label">Recipient</label>
                <div className="col-sm-8">
                    <input 
                    className = "form-control"
                    type='text' 
                    placeholder='Add Recipient Address'
                    value={recipient} 
                    onChange={ (e) => setRecipient(e.target.value) }
                    />
                </div>
            </div>
            <div className ="mb-3 row">
                <label className="col-sm-4 col-form-label">Start On</label>
                <div className="col-sm-8">
                    <input 
                    className = "form-control"
                    type='datetime-local' 
                    value={startDate} 
                    onChange={ (e) => setStartDate(e.target.value) }
                    />
                </div>
            </div>
            <div className ="mb-3 row">
                <label className="col-sm-4 col-form-label">Expires On</label>
                <div className="col-sm-8">
                    <input 
                    className = "form-control"
                    type='datetime-local' 
                    value={expiryDate} 
                    onChange={ (e) => setExpiryDate(e.target.value) }
                    />
                </div>
            </div>
            <div className ="mb-3 row">
                <label className="col-sm-4 col-form-label">Opens Day</label>
                <div className="col-sm-8">
                    <input 
                    className = "form-control"
                    type='number' 
                    min='0'
                    value={daysToOpen} 
                    onChange={ (e) => setDaysToOpen(e.target.value) }
                    />
                </div>
            </div>
            <div className ="mb-3 row">
                <label className="col-sm-4 col-form-label">Speed</label>
                <div className="col-sm-8">
                    <input 
                    className = "form-control"
                    type='number' 
                    min='0'
                    value={speed} 
                    onChange={ (e) => setSpeed(e.target.value) }
                    />
                </div>
            </div>
            <div  className="mb-3 row form-check">
                <input                     
                    type="checkbox" 
                    className="form-check-input" 
                    checked= {createdBySeller} 
                    value={createdBySeller} 
                    onChange={ (e) => setCreatedBySeller(e.currentTarget.checked) }
                />
                <label className="form-check-label">Created by Seller</label>
            </div>
            <input type='submit' className="btn btn-primary" value='Save Task'/>
        </form>
    )
}

export default AddContract

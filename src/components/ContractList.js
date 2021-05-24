import { useState } from 'react'

const ContractList = ({ account, contracts, onAccept, onReject }) => {

    return (
      <>
        <h2>Contracts</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Total Value</th>
              <th scope="col">Paid</th>
              <th scope="col">Buyer</th>
              <th scope="col">Seller</th>
              <th scope="col">Start Date</th>
              <th scope="col">Expiry Date</th>
              <th scope="col">Speed</th>
              <th scope="col">Status</th>
              <th scope="col">Days to Open</th>
              <th scope="col">Created by Seller</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
              {contracts.map((contract, key)=>{

                  const start = new Date(contract.startDate*1000)
                  const startDate = start.getDate() + '/' + start.getMonth() +  '/' + start.getFullYear()
                  
                  const expires = new Date(contract.expiryDate*1000)
                  const expiryDate = expires.getDate() + '/' + expires.getMonth() +  '/' + expires.getFullYear()

                  const statusValues = ['Not Reviewed', 'Rejected', 'Accepted', 'Fulfilled', 'Missing Payment']
                  const status = statusValues[contract.status]

                  let recipient = ''
                  if(contract.createdBySeller){
                      recipient = contract.buyer
                  }else{
                    recipient = contract.seller
                  }

                  return (
                    <tr key={key}>
                      <th scope="row">{contract.id.toString()}</th>
                      <td>{contract.name}</td>
                      <td>{window.web3.utils.fromWei(contract.totalAmount.toString(), 'Ether')} Eth</td>
                      <td>{window.web3.utils.fromWei(contract.amountPaid.toString(), 'Ether')} Eth</td>
                      <td>{contract.buyer}</td>
                      <td>{contract.seller}</td>
                      <td>{startDate}</td>
                      <td>{expiryDate}</td>
                      <td>{contract.speed}</td>
                      <td>{status}</td>
                      <td>{contract.daysToOpen}</td>
                      {contract.createdBySeller
                       ? <td>Yes</td>
                       : <td>No</td>
                      }
                      <td>
                        { (status === statusValues[0] && account === recipient)
                          ? <button 
                              id = {contract.id}
                              onClick={(event) => {
                                onAccept(event.target.id)
                              } }
                            >
                             Accept
                            </button>
                        : null
                        }
                      </td>
                      <td>
                        { (status === statusValues[0] && account === recipient)
                          ? <button 
                              id = {contract.id}
                              onClick={(event) => {
                                onReject(event.target.id)
                              } }
                            >
                             Reject
                            </button>
                        : null
                        }
                      </td>
                  </tr>
                  )
              })}
          </tbody>
        </table>
        </>
    )
}

export default ContractList

import Link from 'next/link'
import React from 'react'
import CreditCard from './CreditCard'
import {creditCardContent, CreditCardContent} from 'staticData/creditCardContent'

const PaymentMethod = () => {
  return (
    <div className='payment-method mt-5'>
      <h2>
        Payment Methods
      </h2>
        <div className='payment-method-wraper__cards'>
          <ul>
            <li>     
              <div className='d-flex flex-column-reverse flex-md-row justify-content-between my-3'>
                <h3 className='my-3 my-md-0'>Debit/Credit Card (2)</h3>
                <Link href={'/'}>
                  <a>
                    + Add New 
                  </a>
                </Link>
              </div>
              <div className='d-flex flex-column flex-md-row'>
              {creditCardContent &&
                  creditCardContent.map((card) => (
                    <CreditCard cardDetail={card}/>
                  ))}
              </div> 
            </li> 
            <li>
              Digital Wallet (3)     
            </li> 
            <li>
              Linked Bank (2)
            </li>
            <li>
              Other Methods (3)
            </li>
          </ul>   
        </div>
      </div>
  )
}

export default PaymentMethod
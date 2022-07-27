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
      <div className="d-flex flex-column-reverse flex-md-row mt-3 justify-content-between payment-method-wraper">
        <div className='d-flex flex-column flex-md-row payment-method-wraper__cards'>
        {creditCardContent &&
            creditCardContent.map((card) => (
              <CreditCard cardDetail={card}/>
            ))}
        </div>
        <Link href={'/'}>
          <a>
            + Add New 
          </a>
        </Link>
      </div>
    </div>
  )
}

export default PaymentMethod
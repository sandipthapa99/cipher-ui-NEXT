import Image from 'next/image'
import React from 'react'
import { CreditCardContent } from 'staticData/creditCardContent'

const CreditCard = ({cardDetail}: {cardDetail: CreditCardContent[0]}) => {
  return (
    <div className='credit-card-wrapper mt-3 mt-md-0 me-5'>
        <h3>{cardDetail.number}</h3>
        <div className='d-flex justify-content-between credit-card-detail'>        
            <div className='d-flex flex-column'>
                <span>{cardDetail.name}</span>
                <span>{cardDetail.expDate}</span>
            </div>
            <figure>
                <Image src={'/credit-card/Group.jpg'} layout='fill'/>
            </figure>
        </div>
    </div>
  )
}

export default CreditCard
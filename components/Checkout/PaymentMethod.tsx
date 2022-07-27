import Link from 'next/link'
import React, { useContext } from 'react'
import CreditCard from './CreditCard'
import {creditCardContent, CreditCardContent} from 'staticData/creditCardContent'
import { Accordion, AccordionContext, Card, useAccordionButton } from 'react-bootstrap'

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const PaymentMethod = () => {
  return (
    <div className='payment-method mt-5'>
      <h2>
        Payment Methods
      </h2>
        <div className='payment-method-wraper__cards'>
          <ul>
            <li>     
              
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
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header className='d-flex flex-column-reverse align-items-center flex-md-row justify-content-between'>
                <ContextAwareToggle eventKey="0" callback={''}>                  
                <div className='d-flex flex-column-reverse flex-md-row justify-content-between my-3'>
                    <h3 className='my-3 my-md-0'>Debit/Credit Card (2)</h3>
                  </div>
                </ContextAwareToggle>
                <Link href={'/'}>
                    <a>
                      + Add New 
                    </a>
                </Link>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>

                  <div className='d-flex flex-column flex-md-row'>
                  {creditCardContent &&
                      creditCardContent.map((card) => (
                        <CreditCard cardDetail={card}/>
                      ))}
                </div> 
              </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="1" callback={''}>Click me!</ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
        </Accordion>   
        </div>
      </div>
  )
}

export default PaymentMethod
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
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header className='d-flex flex-column-reverse align-items-center flex-md-row justify-content-between'>
                <ContextAwareToggle eventKey="0" callback={''}>                  
                    <span className='my-3 my-md-0'>Debit/Credit Card (2)</span>
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
                      creditCardContent.map((card, key) => (
                        <CreditCard key={key} cardDetail={card}/>
                      ))}
                </div> 
              </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="1" callback={''}> Digital Wallet (3)</ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="2" callback={''}>Linked Bank (2)</ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="3" callback={''}>Other Methods (3)</ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
            </Card>
        </Accordion>   
        </div>
      </div>
  )
}

export default PaymentMethod
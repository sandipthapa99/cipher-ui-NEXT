import Breadcrum from '@components/common/Breadcrum'
import CommonCard from '@components/common/CommonCard'
import FormButton from '@components/common/FormButton'
import InputField from '@components/common/InputField'
import Layout from '@components/Layout'
import { Form, Formik } from 'formik'
import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import { Button,Col, Container, Row } from 'react-bootstrap'
import { referralCardContent } from 'staticData/referralCard'
import emailValidationSchema from 'utils/formValidation/emailValidation'

const About: NextPage = () => {
  return (
    <Layout title="Referral Programs | Cipher">
      <div className="referral-page">
        <Container fluid="xl">
          <Breadcrum currentPage="Referral programs" />
          <div className="referral-page__top-container">
            <h1 className='"pt-1'>Spread the word and earn rewards</h1>
            <Row>
              <Col md={6} className="pt-4">
                {' '}
                <h6>Get 20 credits for every person you refer to Cipher</h6>
                <p>
                  {' '}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an
                </p>
                <Row className="form-input">
                  <p>Invite via email</p>
                  <Col md={7} sm={9}>
                    {' '}
                    <Formik
                      initialValues={{ email: '' }}
                      validationSchema={emailValidationSchema}
                      onSubmit={async (values) => {
                        console.log(values)
                      }}
                    >
                      {({ isSubmitting, errors, touched }) => (
                        <Form>
                          <InputField
                            type="email"
                            name="email"
                            error={errors.email}
                            touch={touched.email}
                            placeHolder="Enter your email"
                          />
                        </Form>
                      )}
                    </Formik>
                  </Col>
                  <Col md={5} sm={3}>
                    <FormButton
                      type="submit"
                      variant="primary"
                      name="Send Invites"
                      className="submit-btn"
                      //isSubmitting={isSubmitting}
                      //isSubmittingClass={isSubmittingClass(isSubmitting)}
                    />
                  </Col>
                </Row>
                <Row className="form-input">
                  <p>Share your invite link</p>
                  <Col md={7} sm={9}>
                    {' '}
                    <Formik
                      initialValues={{ email: '' }}
                      validationSchema={emailValidationSchema}
                      onSubmit={async (values) => {
                        console.log(values)
                      }}
                    >
                      {({ isSubmitting, errors, touched }) => (
                        <Form>
                          <InputField
                            type="email"
                            name="email"
                            error={errors.email}
                            touch={touched.email}
                            placeHolder="https://link.com"
                          />
                        </Form>
                      )}
                    </Formik>
                  </Col>
                  <Col md={5} sm={3}>
                    <FormButton
                      type="submit"
                      variant="primary"
                      name="Copy link  "
                      className="submit-btn"
                    />
                  </Col>
                </Row>
              </Col>
              <Col
                md={6}
                sm={6}
                // lg={4}
              >
                <figure className="thumbnail-img">
                  <Image
                    src="/referral/Saly-27.svg"
                    layout="fill"
                    // objectFit="cover"
                    alt="referral-image"
                  />
                </figure>
              </Col>
            </Row>
          </div>
          <div className="referral-page__bottom-container">
            <h1>How does it work?</h1>
            <Row>
              {referralCardContent &&
                referralCardContent.map((referral) => {
                  return (
                    <Col
                      // sm={6}
                      md={4}
                      // lg={4}
                      key={referral.id}
                    >
                      <CommonCard
                        cardImage={referral.cardImage}
                        cardDescription={referral.cardDescription}
                        cardTitle={referral.cardTitle}
                      />
                    </Col>
                  )
                })}
            </Row>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default About

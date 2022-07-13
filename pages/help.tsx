import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Breadcrum from '@components/common/Breadcrum'
import { Container, Col, Row, Button } from 'react-bootstrap'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import FormButton from '@components/common/FormButton'
import InputField from '@components/common/InputField'
import CommonCard from '@components/common/CommonCard'
import { Form, Formik } from 'formik'
import React from 'react'

import emailValidationSchema from 'utils/formValidation/emailValidation'
import { faSearch } from '@fortawesome/pro-regular-svg-icons'
import { helpCardContent } from 'staticData/helpCardContent'

const Help: NextPage = () => {
  return (
    <Layout title="Help & Support | Cipher">
      <section className="help-page-header">
        <Container>
          <Breadcrum currentPage="Help & Support" />
          <div className="help-page-header__top-container">
            <Row className="d-flex align-items-center">
              <Col md={6}>
                <figure className="thumbnail-img">
                  <Image
                    src="/help/main-image.svg"
                    layout="fill"
                    objectFit="cover"
                    alt="earth-image"
                  />
                </figure>
              </Col>
              <Col md={6}>
                <h1>What help do you need?</h1>
                <Col sm={6}>
                  <Formik
                    initialValues={{ email: '' }}
                    validationSchema={emailValidationSchema}
                    onSubmit={async (values) => {
                      console.log(values)
                    }}
                  >
                    {({ isSubmitting, errors, touched }) => (
                      <Form className="search">
                        <InputField
                          type="email"
                          name="email"
                          error={errors.email}
                          touch={touched.email}
                          placeHolder="Enter your email"
                        />

                        <button
                          type="submit"
                          className="btn"
                          disabled={isSubmitting}
                        >
                          <FontAwesomeIcon
                            icon={faSearch}
                            className="svg-icon"
                          />
                        </button>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <section className="help-page-content">
        <Container fluid="xl">
          <div className="help-page-content__browse-container">
            <h1>Browse help categories</h1>
            <Row>
              {helpCardContent &&
                helpCardContent.map((help) => {
                  return (
                    <Col
                      className="help-card"
                      // sm={6}
                      md={4}
                      // lg={4}
                      key={help.id}
                    >
                      <CommonCard
                        cardImage={help.cardImage}
                        cardDescription={help.cardDescription}
                        cardTitle={help.cardTitle}
                      />
                    </Col>
                  )
                })}
            </Row>
          </div>
          <div className="help-page__contact-container">
            <Row>
              <Col md={6}>
                <div className="card-block">
                  <figure className="thumbnail-img">
                    {/* <Image
                      //src=""
                      layout="fill"
                      // height={300}
                      //objectFit="cover"
                      alt="referral-card-image"
                    /> */}
                  </figure>

                  <div className="card-block__card-content">
                    <h2 className="card-title"></h2>
                    <div className="card-description"></div>
                  </div>
                </div>
              </Col>
              <Col md={6}></Col>
            </Row>
          </div>
          <div className="help-page__blog-container"></div>
        </Container>
      </section>
    </Layout>
  )
}

export default Help

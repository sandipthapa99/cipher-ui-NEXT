import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Breadcrum from '@components/common/Breadcrum'
import { Container, Col, Row, Button } from 'react-bootstrap'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons'

import FormButton from '@components/common/FormButton'
import InputField from '@components/common/InputField'

import { Form, Formik } from 'formik'
import React from 'react'

import emailValidationSchema from 'utils/formValidation/emailValidation'

const Help: NextPage = () => {
  return (
    <Layout title="Help & Support | Cipher">
      <Breadcrum currentPage="Help & Support" />
      <div className="help-page">
        <Container fluid="xl">
          <div className="help-page__top-container">
            <Row>
              <Col md={6}>
                <figure className="thumbnail-img">
                  <Image
                    src="/community/earth.png"
                    layout="fill"
                    objectFit="cover"
                    alt="earth-image"
                  />
                </figure>
              </Col>
              <Col md={6}>
                <h1>What help do you need?</h1>
                <div className="search">
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
                          placeHolder="Search Articles"
                        />
                        {/* <div className="btn-wrapper">
                          <button
                            type="submit"
                            className="btn"
                            disabled={isSubmitting}
                          >
                            <FontAwesomeIcon
                              icon={faSearchengin}
                              className="svg-icon"
                            />
                          </button> 
                        </div>*/}
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
          </div>
          <div className="help-page__browse-container">
            <h1>Browse help categories</h1>
          </div>
          <div className="help-page__contact-container"></div>
          <div className="help-page__blog-container"></div>
        </Container>
      </div>
    </Layout>
  )
}

export default Help

import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Breadcrum from '@components/common/Breadcrum'
import { Container, Accordion, Col, Row, Button } from 'react-bootstrap'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { blogCardContent } from 'staticData/community'
import BlogCard from '@components/common/BlogCard'
import FormButton from '@components/common/FormButton'
import InputField from '@components/common/InputField'
import CommonCard from '@components/common/CommonCard'
import { Form, Formik } from 'formik'
import React from 'react'
import CardBtn from '@components/common/CardBtn'
import emailValidationSchema from 'utils/formValidation/emailValidation'
import { faSearch, faRemove } from '@fortawesome/pro-regular-svg-icons'
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
                        name="text"
                        error={errors.email}
                        touch={touched.email}
                        placeHolder="Search Categories"
                      />

                      <button
                        type="submit"
                        className="btn"
                        disabled={isSubmitting}
                      >
                        <FontAwesomeIcon icon={faSearch} className="svg-icon" />
                      </button>
                    </Form>
                  )}
                </Formik>
                <div className="available-categories">
                  <input type="text" name="text" value="Hello" />
                  <button type="submit" className="cancel">
                    <FontAwesomeIcon icon={faRemove} className="svg-icon" />
                  </button>
                </div>
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
          <div className="help-page-content__contact-container">
            <Row>
              <Col md={6} className="d-flex align-items-stretch">
                <div className="card-block ">
                  <h1>Get In Touch With Us</h1>
                  <p>
                    For more information, we're here for you to answer your
                    queries.
                  </p>

                  <div className="contact-device">
                    <Button className="btn">Contact Us</Button>

                    <figure className="thumbnail-img">
                      <Image
                        src="/help/contact.svg"
                        layout="fill"
                        objectFit="cover"
                        alt="phone-image"
                      />
                    </figure>
                  </div>
                </div>
              </Col>
              <Col md={6} className="d-flex align-items-stretch">
                <div className="card-block">
                  <h1>Ask In Community</h1>
                  <p>
                    The Cipher community is here to help you as well. Please
                    feel free to get help.
                  </p>

                  <div className="contact-device">
                    <Button className="btn">Ask</Button>
                    <figure className="thumbnail-img">
                      <Image
                        src="/help/earth.svg"
                        layout="fill"
                        objectFit="cover"
                        alt="earth-image"
                      />
                    </figure>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="help-page-content__blog-container">
            <h1>Promoted Blogs</h1>
            <Row>
              {blogCardContent &&
                blogCardContent.map((blog) => {
                  return (
                    <Col
                      className="d-flex align-items-stretch"
                      // sm={6}
                      md={4}
                      // lg={4}
                      key={blog.id}
                    >
                      <BlogCard
                        cardImage={blog.cardImage}
                        cardDescription={blog.cardDescription}
                        cardTitle={blog.cardTitle}
                      />
                    </Col>
                  )
                })}
            </Row>
          </div>
          <div className="help-page-content__faq-container">
            <h1>Frequently Asked Questions</h1>
            <Accordion flush>
              <Accordion.Item eventKey="1">
                <Accordion.Header>What is Cipher?</Accordion.Header>
                <Accordion.Body>
                  <p>
                    With Cagtu, a custom app development project starts with you
                    preparing and then submitting a request for proposal, also
                    referred to as an RFP(request for proposal). It will help us
                    create a tailored, individualised response.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>What is Cipher?</Accordion.Header>
                <Accordion.Body>
                  <p>
                    With Cagtu, a custom app development project starts with you
                    preparing and then submitting a request for proposal, also
                    referred to as an RFP(request for proposal). It will help us
                    create a tailored, individualised response.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>What is Cipher?</Accordion.Header>
                <Accordion.Body>
                  <p>
                    With Cagtu, a custom app development project starts with you
                    preparing and then submitting a request for proposal, also
                    referred to as an RFP(request for proposal). It will help us
                    create a tailored, individualised response.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  How long does the project take?
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    The implementation time depends on the type of order, the
                    technology chosen, and the amount of work that needs to be
                    done. We always try to establish a realistic time frame for
                    completing the project. Most MVP (Minimum Viable Product)
                    versions are implemented within 2-4 months of signing the
                    contract. Also, we develop projects through long-term
                    collaboration plans that have no end date.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  How do you provide project estimates? What are the modes of
                  communication that you use?
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    Team Cagtu carries out scoping and estimation for our
                    customers&apos; projects through the tools developed
                    in-house. We can schedule a call, proceed with email
                    communication, or stay in contact through any instant
                    messenger convenient to you. If all the specialists required
                    for your project are available, we start the work as soon as
                    possible, or even immediately.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export default Help

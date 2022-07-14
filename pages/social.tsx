import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Breadcrum from '@components/common/Breadcrum'
import { Container, Col, Carousel, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons'
import Image from 'next/image'
import BlogCard from '@components/common/BlogCard'
import { blogCardContent } from 'staticData/community'
import React from 'react'
import BusinessGoal from '@components/common/BusinessGoal'
import { businessGoal } from 'staticData/businessGoal'
const SocialResponsibilities: NextPage = () => {
  return (
    <Layout title="Social Responsibilities | Cipher">
      <section className="social-page">
        <Container fluid="xl">
          <Breadcrum currentPage="Social responsibilities" />
          <div className="social-page__top-container">
            <h1>Social Responsibilites</h1>
            <h4>Towards Community</h4>
            <figure className="thumbnail-img">
              <Image
                src="/social/Ellipse1.svg"
                layout="fill"
                objectFit="cover"
                alt="socialpage-image"
              />
            </figure>
            <div className="card">
              <div className="description">
                <h4>Our moto</h4>
                <p>
                  “Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged when an unknown printer took a galley of
                  type and scrambled it to make a type specimen book. It has
                  survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged.”
                </p>
              </div>
            </div>
          </div>
          <div className="social-page__commitment">
            <h1>Our commitment towards future sustainibility</h1>
            <figure className="thumbnail-img">
              <Image
                src="/social/commitment.svg"
                layout="fill"
                objectFit="cover"
                alt="socialpage-image"
              />
            </figure>
          </div>
          <Carousel>
            {businessGoal &&
              businessGoal.map((goal) => {
                return (
                  <Carousel.Item
                  //interval={1000}
                  >
                    <BusinessGoal
                      cardImage={goal.cardImage}
                      cardTitle={goal.cardTitle}
                      cardAuthor={goal.cardAuthor}
                      cardDescription={goal.cardDescription}
                    />
                  </Carousel.Item>
                )
              })}
          </Carousel>

          <div className="social-page__blogs">
            <div className="title-wrapper d-flex justify-content-between">
              {/* <h2 className="heading-title">Community activity</h2> */}
              <h1>Our Blogs</h1>
              <a href="" className="view-more">
                view more{' '}
                <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
              </a>
            </div>
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
        </Container>
      </section>
    </Layout>
  )
}

export default SocialResponsibilities

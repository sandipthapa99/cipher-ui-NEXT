import Breadcrum from '@components/common/Breadcrum'
import MerchantProfileCard from '@components/common/MerchantProfileCard'
import Reviews from '@components/common/Reviews'
import Layout from '@components/Layout'
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons'
import {
  faEllipsisVertical,
  faHeart,
  faShare,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { merchantProfileCardInfo } from 'staticData/merchantProfileCard'
import { reviewsContent } from 'staticData/reviews'
import { HomeSearchdata } from 'utils/homeSearchData'
const MerchantProfile: NextPage = () => {
  return (
    <Layout title="Profile | Cipher">
      <Container fluid="xl">
        <section className="merchant-profile">
          <Breadcrum
            currentPage="Profile"
            subPage="Detail"
            hasSubPage={false}
          />

          {/* Explore top container start */}
          <section className="merchant-profile__top-container">
            {merchantProfileCardInfo &&
              merchantProfileCardInfo.map((info) => (
                <MerchantProfileCard
                key={info.id}
                  merchantImage={info.merchantImage}
                  merchantJob={info.merchantJob}
                  merchantBio={info.merchantBio}
                  merchantLocation={info.merchantLocation}
                  merchantRating={info.merchantRating}
                  merchantPrice={info.merchantPrice}
                  merchantOrganization={info.merchantOrganization}
                  happyClients={info.happyClients}
                  successRate={info.successRate}
                  activeFrom={info.activeFrom}
                  activeTo={info.activeTo}
                  memberSince={info.memberSince}
                  moreServices={info.moreServices}
                  taskCompleted={info.taskCompleted}
                  userReviews={info.userReviews}
                  merchantActiveStatus={info.merchantActiveStatus}
                />
              ))}
          </section>

          {/* Service detail reviews section start */}
          <section className="merchant-profile__reviews">
            <div className="head-container">
              <h3>
                My Reviews <span>(3,0003)</span>{' '}
              </h3>
            </div>
            <div className="review-container">
              {reviewsContent &&
                reviewsContent.map((review) => (
                  <Row key={review.id}>
                    <Col md={8}>
                      <Reviews
                        name={review.name}
                        ratings={review.ratings}
                        description={review.description}
                        time={review.time}
                        image={review.image}
                      />
                    </Col>
                  </Row>
                ))}
              <Link href="/">See all reviews</Link>
            </div>
          </section>
          {/* Service detail reviews setion end */}
        </section>
      </Container>
    </Layout>
  )
}

export default MerchantProfile

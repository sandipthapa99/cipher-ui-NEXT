import Breadcrum from '@components/common/Breadcrum'
import MerchantProfileCard from '@components/common/MerchantProfileCard'
import Reviews from '@components/common/Reviews'
import SelectInputField from '@components/common/SelectInputField'
import UserProfileCard from '@components/common/UserProfile'
import Layout from '@components/Layout'
import AboutProfile from '@components/Profile/ProfileAbout'
import { faAngleRight, faChevronDown } from '@fortawesome/pro-regular-svg-icons'
import {
  faEllipsisVertical,
  faHeart,
  faShare,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik } from 'formik'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { merchantProfileCardInfo } from 'staticData/merchantProfileCard'
import { reviewsContent } from 'staticData/reviews'
import { tabContent } from 'staticData/tab'
import { userProfileCardInfo } from 'staticData/userProfileCard'
import HomeSearchSchema from 'utils/formValidation/homeSearchValidation'
import { HomeSearchdata } from 'utils/homeSearchData'
<<<<<<< HEAD
import { personType, reviewType } from 'utils/options'
import SelectInputField from '@components/common/SelectInputField'
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
=======
import { reviewType } from 'utils/options'
>>>>>>> 2989945563226374ac815d08a6cccbf7349ef76f

const UserProfile: NextPage = () => {
  const [key, setKey] = useState('about')
  return (
    <Layout title="Profile | Cipher">
      <Container fluid="xl">
        <section className="user-profile">
          <Breadcrum
            currentPage="Profile"
            subPage="Detail"
            hasSubPage={false}
          />

          {/* Explore top container start */}
          <section className="user-profile__top-container">
            {userProfileCardInfo &&
              userProfileCardInfo.map((info) => (
                <UserProfileCard
                  key={info.id}
                  userImage={info.userImage}
                  userName={info.userName}
                  userJob={info.userJob}
                  userRating={info.userRating}
                  userPrice={info.userPrice}
                  userLocation={info.userLocation}
                  userPhone={info.userPhone}
                  userEmail={info.userEmail}
                  moreServices={info.moreServices}
                  activeFrom={info.activeFrom}
                  activeTo={info.activeTo}
                  userBio={info.userBio}
                  userBadge={info.userBadge}
                  userPoints={info.userPoints}
                  pointGoal={info.pointGoal}
                  happyClients={info.happyClients}
                  successRate={info.successRate}
                  userReviews={info.userReviews}
                  taskCompleted={info.taskCompleted}
                  userActiveStatus={info.userActiveStatus}
                  tooltipMessage={info.tooltipMessage}
                />
              ))}
          </section>
          <section className="user-profile__bottom-container">
            <div className="tabs">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(prev => k ?? prev)}
                className="mb-3"
              >
                {tabContent &&
                  tabContent.map((tabName) => (
                    <Tab
                      key={tabName.id}
                      eventKey={tabName.title.toLowerCase()}
                      title={tabName.title}
                    >
                      <AboutProfile/>
                    </Tab>
                  ))}
              </Tabs>
            </div>

            <section className="reviews">
              <div className="head-container">
                <h3>
                  My Reviews <span>(3,0003)</span>{' '}
                </h3>
                <div className="dropdowns">
                  <Formik
                    initialValues={HomeSearchdata}
                    validationSchema={HomeSearchSchema}
                    onSubmit={async (values) => {
                      console.log(values)
                    }}
                  >
                    <div className="dropdown-wrapper review-type">
                      <div className="dropdown">
                        <SelectInputField
                          name="review"
                          options={personType}
                          fieldRequired
                          defaultValue='Tasker'
                        />
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="svg-icon"
                        />
                      </div>
                    </div>
                  </Formik>

                  <Formik
                    initialValues={HomeSearchdata}
                    validationSchema={HomeSearchSchema}
                    onSubmit={async (values) => {
                      console.log(values)
                    }}
                  >
                    <div className="dropdown-wrapper relevancy">
                      <div className="dropdown">
                        <SelectInputField
                          name="review"
                          options={reviewType}
                          placeholder="Most Relevant"
                          fieldRequired
                        />
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="svg-icon"
                        />
                      </div>
                    </div>
                  </Formik>
                </div>
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
          </section>
          {/* Service detail reviews section start */}

          {/* Service detail reviews setion end */}
        </section>
      </Container>
    </Layout>
  )
}

export default UserProfile

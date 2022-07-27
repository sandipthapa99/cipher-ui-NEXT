import Reviews from '@components/common/Reviews'
import SelectInputField from '@components/common/SelectInputField'
import { faPencil } from '@fortawesome/pro-regular-svg-icons'
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { Col,Row } from 'react-bootstrap'
import { ProfileAboutContent } from 'staticData/profileAboutContent'
import { reviewsContent } from 'staticData/reviews'
import HomeSearchSchema from 'utils/formValidation/homeSearchValidation'
import { HomeSearchdata } from 'utils/homeSearchData'
import { personType, reviewType } from 'utils/options'

const AboutProfile = () => {
  return (
    <>
      {ProfileAboutContent &&
        ProfileAboutContent.map((about) => (
          <div className="about-profile" key={about.id}>
            <div className="type portfolio">
              <div className="title-wrapper d-flex justify-content-between">
                {/* <h2 className="heading-title">Community activity</h2> */}
                <h1>My Portfolio</h1>
                <a href="#!">Add New</a>
              </div>

              <div className="content">
                {/* <Row></Row> */}
                {about.portfolio.map((info) => (
                  <div className="image" key={info.id}>
                    <figure className="thumbnail-img">
                      <Image
                        src={info.image}
                        layout="fill"
                        objectFit="cover"
                        alt="portfolio-image"
                      />
                    </figure>

                    <p>{info.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="type experience">
              <div className="title-wrapper d-flex justify-content-between">
                {/* <h2 className="heading-title">Community activity</h2> */}
                <h1>Experience</h1>
                <a href="#!">Add New</a>
              </div>

              <Row>
                <Col md={9}>
                  <div className="content">
                    {about.experience.map((info) => (
                      <div className="experience__type" key={info.id}>
                        <div className="name d-flex">
                          <h3>{info.name}</h3>
                          <FontAwesomeIcon icon={faPencil} className="svg-icon" />
                        </div>
                        <div className="company d-flex">
                          <p className="name">{info.company}</p>
                          <p className="job-type">{info.jobType}</p>
                        </div>
                        <p className="description">{info.description}</p>
                        <p className="date">
                          {info.dateFrom}-{info.dateTo}
                        </p>
                        <p className="address">{info.address}</p>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
            <div className="type skills">
              <div className="title-wrapper d-flex justify-content-between">
                {/* <h2 className="heading-title">Community activity</h2> */}
                <h1>Skills</h1>
                <a href="#!">Add New</a>
              </div>

              <Row>
                <Col md={9}>
                  <div className="content">
                    {about.skills.map((info) => (
                      <div className="skills__type" key={info.id}>
                        {info.name}
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
            <div className="type education">
              <div className="title-wrapper d-flex justify-content-between">
                {/* <h2 className="heading-title">Community activity</h2> */}
                <h1>Education</h1>
                <a href="#!">Add New</a>
              </div>
              <Row>
                <Col md={9}>
                  <div className="content">
                    {about.education.map((info) => (
                      <div className="education__type" key={info.id}>
                        <div className="name d-flex">
                          <h3 className="institution">{info.institution}</h3>
                          <FontAwesomeIcon icon={faPencil} className="svg-icon" />
                        </div>
                        <h3 className="program">{info.program}</h3>

                        <p className="date">
                          {info.dateFrom}-{info.dateTo}
                        </p>
                        <p className="address">{info.address}</p>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
            <div className="type certification">
              <div className="title-wrapper d-flex justify-content-between">
                {/* <h2 className="heading-title">Community activity</h2> */}
                <h1>Certifications</h1>
                <a href="#!">Add New</a>
              </div>
              <Row>
                <Col md={9}>
                  <div className="content">
                    {about.certifications.map((info) => (
                      <div className="certification__type" key={info.id}>
                        <div className="name d-flex">
                          <h3 className="institution">{info.name}</h3>
                          <FontAwesomeIcon icon={faPencil} className="svg-icon" />
                        </div>
                        <h3 className="program">{info.program}</h3>
                        <p className="date">
                          {info.dateFrom}-{info.dateTo}
                        </p>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>

            <section className="reviews">
              <div className="head-container">
                <h3>
                  My Reviews <span>(3,003)</span>{' '}
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
                          placeHolder='Tasker'
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
                          placeHolder='Most Relevant'
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
          </div>
        ))}
    </>
  )
}
export default AboutProfile

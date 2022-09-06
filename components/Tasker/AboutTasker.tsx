import PortfolioDetails from "@components/Profile/PortfolioDetail";
import { format } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { TaskerProps } from "types/taskerProps";

interface AboutTasker {
    taskerDetail: TaskerProps["result"][0];
}

export const AboutTasker = ({ taskerDetail }: AboutTasker) => {
    const userSkills = taskerDetail?.skill
        ? JSON.parse(taskerDetail?.skill)
        : [];
    console.log("tasker detail", taskerDetail);
    const [isOnlyPortfolioText, setIsOnlyPortfolioText] = useState(false);
    const [showPortfolioDetails, setShowPortfolioDetails] = useState(false);
    const [id, setId] = useState<number | undefined>();

    return (
        <>
            <div className="about-profile">
                <div className="type portfolio">
                    <div className="title-wrapper d-flex justify-content-between">
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>My Portfolio</h1>
                    </div>

                    <div className="content">
                        {taskerDetail?.portfolio
                            ? taskerDetail?.portfolio?.map((info: any) => (
                                  <div
                                      className="image"
                                      key={info?.id}
                                      onClick={() => setId(info?.id)}
                                  >
                                      <Row className="gx-5 px-3">
                                          <Col md={6} sm={12} xs={12}>
                                              {info?.images[0]?.media ? (
                                                  <figure
                                                      className="thumbnail-img"
                                                      onClick={() =>
                                                          setShowPortfolioDetails(
                                                              true
                                                          )
                                                      }
                                                  >
                                                      <Image
                                                          src={
                                                              info?.images[0]
                                                                  ?.media ??
                                                              "/userprofile/image.svg"
                                                          }
                                                          layout="fill"
                                                          objectFit="cover"
                                                          alt="portfolio-image"
                                                      />
                                                  </figure>
                                              ) : (
                                                  ""
                                              )}
                                          </Col>
                                      </Row>
                                      <PortfolioDetails
                                          show={showPortfolioDetails}
                                          setShowPortfolioDetails={
                                              setShowPortfolioDetails
                                          }
                                          handleClose={() =>
                                              setShowPortfolioDetails(false)
                                          }
                                          id={id}
                                          isTaskerPortfolio={true}
                                      />
                                      {info?.images.length < 1 ? (
                                          <div className="portfolio-title">
                                              <p className="text-center">
                                                  {info.title}
                                              </p>
                                          </div>
                                      ) : (
                                          <div className="portfolio-title">
                                              <p
                                                  className={
                                                      isOnlyPortfolioText
                                                          ? "text-center text-pointer"
                                                          : "text-center"
                                                  }
                                              >
                                                  {info.title}
                                              </p>
                                          </div>
                                      )}
                                  </div>
                              ))
                            : "This tasker have no portfolio."}
                    </div>
                </div>
                <div className="type experience">
                    <div className="title-wrapper d-flex justify-content-between">
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>Experience</h1>
                    </div>

                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {taskerDetail?.experience
                                    ? taskerDetail?.experience?.map(
                                          (value: any, key: any) => (
                                              <div
                                                  className="experience__type"
                                                  key={key}
                                              >
                                                  <div className="name d-flex">
                                                      <h3>{value?.title}</h3>
                                                  </div>
                                                  <div className="company d-flex">
                                                      <p className="name">
                                                          {value?.company_name}
                                                          &nbsp;. &nbsp;
                                                          {
                                                              value?.employment_type
                                                          }
                                                      </p>
                                                  </div>
                                                  <p className="description">
                                                      {value?.description}
                                                  </p>
                                                  <p className="date">
                                                      {format(
                                                          new Date(
                                                              value?.start_date
                                                          ),
                                                          "MMMM yyyy"
                                                      )}
                                                      {`${
                                                          value?.end_date
                                                              ? `-`
                                                              : "- Present"
                                                      }`}
                                                      {value?.end_date &&
                                                          format(
                                                              new Date(
                                                                  value.end_date
                                                              ),
                                                              "MMMM yyyy"
                                                          )}
                                                  </p>
                                                  <p className="address">
                                                      {value.location}
                                                  </p>
                                              </div>
                                          )
                                      )
                                    : "This tasker have no experience."}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="type skills">
                    <div className="title-wrapper d-flex justify-content-between">
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>Skills</h1>
                    </div>

                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {userSkills
                                    ? userSkills.map((info: any, i: any) => (
                                          <div className="skills__type" key={i}>
                                              {info}
                                          </div>
                                      ))
                                    : "This tasker have no skills."}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="type education">
                    <div className="title-wrapper d-flex justify-content-between">
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>Education</h1>
                    </div>
                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {taskerDetail?.education
                                    ? taskerDetail?.education?.map(
                                          (value: any, key: number) => (
                                              <div
                                                  className="education__type"
                                                  key={key}
                                              >
                                                  <div className="name d-flex">
                                                      <h3 className="institution">
                                                          {value.school}
                                                      </h3>
                                                  </div>
                                                  <h3 className="program">
                                                      {value.degree}
                                                  </h3>

                                                  <p className="date">
                                                      {format(
                                                          new Date(
                                                              value.start_date
                                                          ),
                                                          "MMMM yyyy"
                                                      )}
                                                      -
                                                      {format(
                                                          new Date(
                                                              value.end_date
                                                          ),
                                                          "MMMM yyyy"
                                                      )}
                                                  </p>
                                                  <p className="address">
                                                      {value.location}
                                                  </p>
                                              </div>
                                          )
                                      )
                                    : "This tasker have no education."}
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="type certification">
                    <div className="title-wrapper d-flex justify-content-between">
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>Certifications</h1>
                    </div>
                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {taskerDetail?.certificates
                                    ? taskerDetail?.certificates?.map(
                                          (value: any, key: any) => (
                                              <div
                                                  className="certification__type"
                                                  key={key}
                                              >
                                                  <div className="name d-flex">
                                                      {/* <Link
                                                          href={
                                                              value?.certificate_url
                                                          }
                                                      > */}
                                                      <a
                                                          href={
                                                              value?.certificate_url
                                                          }
                                                          target="_blank"
                                                          rel="noreferrer"
                                                      >
                                                          <h3 className="institution">
                                                              {value?.name}
                                                          </h3>
                                                      </a>
                                                      {/* </Link> */}
                                                  </div>
                                                  <h3 className="program">
                                                      {value?.description}
                                                  </h3>
                                                  <p className="date">
                                                      {format(
                                                          new Date(
                                                              value?.issued_date
                                                          ),
                                                          "MMMM yyyy"
                                                      )}
                                                      {`${
                                                          value?.expire_date
                                                              ? `-`
                                                              : "- Present"
                                                      }`}
                                                      {value?.expire_date &&
                                                          format(
                                                              new Date(
                                                                  value.expire_date
                                                              ),
                                                              "MMMM yyyy"
                                                          )}
                                                  </p>
                                              </div>
                                          )
                                      )
                                    : "This tasker have no certificates."}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

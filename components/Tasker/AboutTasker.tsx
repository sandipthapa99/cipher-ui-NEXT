import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { TaskerDetail } from "types/tasks";

interface AboutTasker {
    taskerDetail: TaskerDetail;
}

export const AboutTasker = ({ taskerDetail }: AboutTasker) => {
    const userSkills = taskerDetail?.skill
        ? JSON.parse(taskerDetail?.skill)
        : [];

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
                                  <div className="image" key={info?.id}>
                                      <Row>
                                          <Col md={6}>
                                              <Link href={info?.credential_url}>
                                                  <a target="_blank">
                                                      {info?.image ? (
                                                          <figure className="thumbnail-img">
                                                              <Image
                                                                  src={`${info?.image}`}
                                                                  layout="fill"
                                                                  objectFit="cover"
                                                                  alt="portfolio-image"
                                                              />
                                                          </figure>
                                                      ) : (
                                                          ""
                                                      )}
                                                  </a>
                                              </Link>
                                          </Col>
                                          {/* <Col md={6}>
                                              <Link href={`${info?.file}`}>
                                                  <a target="_blank">
                                                      {info?.file ? (
                                                          <figure className="thumbnail-img">
                                                              <Image
                                                                  src="/userprofile/documents/pdf.svg"
                                                                  layout="fill"
                                                                  objectFit="cover"
                                                                  alt="portfolio-file"
                                                              />
                                                          </figure>
                                                      ) : (
                                                          ""
                                                      )}
                                                  </a>
                                              </Link>
                                          </Col> */}
                                      </Row>

                                      <p className="text-center">
                                          {info.title}
                                      </p>
                                  </div>
                              ))
                            : "Looks like you have no Portfolio data"}
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
                                    : "Looks like you have no Experience Data"}
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
                                {userSkills.map((info: any, i: any) => (
                                    <div className="skills__type" key={i}>
                                        {info}
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
                                    : "Looks like you have no Education Data"}
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
                                    : "Looks like you have no certificates"}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

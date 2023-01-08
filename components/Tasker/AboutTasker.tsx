import PortfolioDetails from "@components/Profile/PortfolioDetail";
import { Alert } from "@mantine/core";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { format } from "date-fns";
import parse from "html-react-parser";
import Image from "next/image";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { ITasker } from "types/tasker";
interface AboutTaskerProps {
    taskerDetail: ITasker;
}

export const AboutTasker = ({ taskerDetail }: AboutTaskerProps) => {
    const userSkills = taskerDetail?.skill
        ? JSON.parse(taskerDetail?.skill)
        : [];
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

                    {!taskerDetail ||
                        (taskerDetail?.portfolio?.length <= 0 && (
                            <Alert
                                icon={<ErrorOutlineOutlined />}
                                title="No data Available"
                                color="orange"
                                radius="md"
                                sx={{ minWidth: 100 }}
                            >
                                The User has no Portfolio data
                            </Alert>
                        ))}
                    <div className="content">
                        {taskerDetail?.portfolio &&
                            taskerDetail?.portfolio?.map((info: any) => (
                                <div
                                    className="image"
                                    key={info?.id}
                                    onClick={() => setId(info?.id)}
                                >
                                    <Row className="px-3">
                                        <Col md={6}>
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
                                                        //   src={
                                                        //       info?.images[0]
                                                        //           ?.media ??
                                                        //       info?.images[1]
                                                        //           ?.media
                                                        //   }
                                                        src={
                                                            //info?.images ??
                                                            info?.images[0]?.name
                                                                .substring(
                                                                    info.images[0]?.name.indexOf(
                                                                        "."
                                                                    ) + 1
                                                                )
                                                                .includes("jpg")
                                                                ? info
                                                                      ?.images[0]
                                                                      ?.media
                                                                : info
                                                                      ?.images[1]
                                                                      ?.media
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
                                        isTaskerPortfolio={true}
                                        id={id}
                                    />

                                    {/* <p className="text-center">{info.title}</p> */}
                                </div>
                            ))}
                    </div>
                </div>
                <div className="type experience">
                    <div className="title-wrapper d-flex justify-content-between">
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>Experience</h1>
                    </div>

                    {!taskerDetail ||
                        (taskerDetail?.experience?.length <= 0 && (
                            <Alert
                                icon={<ErrorOutlineOutlined />}
                                title="No data Available"
                                color="orange"
                                radius="md"
                                className="mb-4"
                                sx={{ minWidth: 100 }}
                            >
                                The User has no Experience data
                            </Alert>
                        ))}
                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {taskerDetail?.experience &&
                                    taskerDetail?.experience?.map(
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
                                                        {value?.employment_type}
                                                    </p>
                                                </div>
                                                <div className="description">
                                                    {parse(value?.description)}
                                                </div>
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
                                    )}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="type skills">
                    <div className="title-wrapper d-flex justify-content-between">
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>Skills</h1>
                    </div>
                    {!userSkills ||
                        (userSkills?.length <= 0 && (
                            <Alert
                                icon={<ErrorOutlineOutlined />}
                                title="No data Available"
                                color="orange"
                                radius="md"
                                className="mb-4"
                                sx={{ minWidth: 100 }}
                            >
                                The User has no Skill data
                            </Alert>
                        ))}
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
                    {!taskerDetail?.education ||
                        (taskerDetail?.education?.length <= 0 && (
                            <Alert
                                icon={<ErrorOutlineOutlined />}
                                title="No data Available"
                                color="orange"
                                radius="md"
                                className="mb-4"
                                sx={{ minWidth: 100 }}
                            >
                                The User has no Education data
                            </Alert>
                        ))}
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
                    {!taskerDetail?.certificates ||
                        (taskerDetail?.certificates?.length <= 0 && (
                            <Alert
                                icon={<ErrorOutlineOutlined />}
                                title="No data Available"
                                color="orange"
                                radius="md"
                                className="mb-4"
                                sx={{ minWidth: 100 }}
                            >
                                The User has no Certification data
                            </Alert>
                        ))}
                    <Row>
                        <Col md={9}>
                            <div className="content">
                                {taskerDetail?.certificates
                                    ? taskerDetail?.certificates?.map(
                                          (value: any, key: any) => (
                                              <div
                                                  className="certification__type py-2"
                                                  key={key}
                                              >
                                                  <div className="name d-flex">
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
                                                  <p className="issuing_organization">
                                                      {
                                                          value?.issuing_organization
                                                      }
                                                  </p>

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
                                                  <p className="description">
                                                      {parse(
                                                          value?.description
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

import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Accordion } from "react-bootstrap";
import { languageActiveData, languageExtraData } from "staticData/languageData";

const LanguagesSettings = () => {
    return (
        <div className="account-form">
            <h2>Languages</h2>
            <p>Choose language as per your preference</p>
            {languageActiveData.map((value, key) => (
                <div
                    className="d-flex justify-content-between align-items-center border-bottom py-4"
                    key={key}
                >
                    <span className="d-flex flex-column align-items-center flex-md-row">
                        {value.title}
                        {value.isDefault ? (
                            <button
                                className="btn default ms-0 ms-md-5 px-4 mt-3 mt-md-0"
                                disabled
                            >
                                Default
                            </button>
                        ) : (
                            ""
                        )}
                    </span>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
            ))}
            <Accordion className="mt-5" alwaysOpen flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="font-weight-bold">
                        More Languages
                    </Accordion.Header>
                    <Accordion.Body>
                        {languageExtraData.map((value, key) => (
                            <div
                                className="d-flex justify-content-between align-items-center border-bottom py-4"
                                key={key}
                            >
                                <span className="d-flex flex-column align-items-center flex-md-row">
                                    <input type="checkbox" className="me-4" />
                                    {value.title}
                                </span>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default LanguagesSettings;

import DragDrop from "@components/common/DragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImageVideoDragDop } from "staticData/dragDropContent";
import type { BookNowModalCardProps } from "types/bookNow";
import { BookServiceFormData } from "utils/formData";
import { bookServiceSchema } from "utils/formValidation/bookServiceFormValidation";
import { isSubmittingClass } from "utils/helpers";

const ModalCard = ({
    title,
    price,
    description,
    image,
    show,
    handleClose,
}: BookNowModalCardProps) => {
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Details</Modal.Title>
                </Modal.Header>

                <div className="modal-body-content">
                    <div className="details">
                        <div className="title d-flex">
                            <h4 className="title-name">
                                Title: <span>{title}</span>
                            </h4>
                        </div>
                        <div className="price d-flex">
                            <h4 className="title-name">
                                Price: <span>{price}</span>
                            </h4>
                        </div>
                        <p className="description">{description}</p>
                    </div>
                    <Formik
                        initialValues={BookServiceFormData}
                        validationSchema={bookServiceSchema}
                        onSubmit={async (values) => {
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <div className="problem">
                                    <h4>Problem Description</h4>
                                    <InputField
                                        type="textarea"
                                        name="description"
                                        min="1"
                                        error={errors.problemDescription}
                                        touch={touched.problemDescription}
                                        placeHolder="Portfolio Description"
                                    />
                                </div>
                                <div className="completion">
                                    <Row>
                                        <Col md={6}>
                                            <h4>Completion Date</h4>
                                            <InputField
                                                type="textarea"
                                                name="date"
                                                error={errors.date}
                                                touch={touched.date}
                                                placeHolder="dd/mm/yyy"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <h4>Estimated Time(hr)</h4>
                                            <InputField
                                                type="number"
                                                name="time"
                                                min="1"
                                                error={errors.time}
                                                touch={touched.time}
                                                placeHolder="1"
                                            />
                                        </Col>
                                    </Row>
                                </div>

                                <div className="book-now-gallery">
                                    <h4>Gallery</h4>
                                    <p>Add relevant images or videos</p>

                                    <Row className="gx-5">
                                        <Col md={3}>
                                            <figure className="girl-thumbnail-img">
                                                <Image
                                                    src={image}
                                                    height={280}
                                                    width={280}
                                                    alt="serviceprovider-image"
                                                />
                                            </figure>
                                        </Col>
                                        <Col md={3}>
                                            {ImageVideoDragDop &&
                                                ImageVideoDragDop.map(
                                                    (info) => (
                                                        <DragDrop
                                                            key={info.id}
                                                            image={info.image}
                                                            fileType={
                                                                info.fileType
                                                            }
                                                            maxImageSize={
                                                                info.maxImageSize
                                                            }
                                                            maxVideoSize={
                                                                info.maxVideoSize
                                                            }
                                                        />
                                                    )
                                                )}
                                        </Col>
                                    </Row>
                                    <div className="size-warning">
                                        <FontAwesomeIcon
                                            icon={faCircleInfo}
                                            className="svg-icon"
                                        />
                                        <p>
                                            Images and videos should not be more
                                            than 200MB
                                        </p>
                                    </div>
                                </div>
                                <Modal.Footer>
                                    <Button
                                        className="btn close-btn"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Book Now"
                                        className="submit-btn w-25"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                        onClick={handleClose}
                                    />
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </>
    );
};
export default ModalCard;

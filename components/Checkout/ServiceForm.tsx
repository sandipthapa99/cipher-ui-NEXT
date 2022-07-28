import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { Form, Formik } from "formik";
import React,{ Dispatch, SetStateAction } from "react";
import { Col, Row } from "react-bootstrap";
import { EquipmentFormData } from "utils/formData";
import { equipmentFormSchema } from "utils/formValidation/equipmentFormValidation";
import { isSubmittingClass } from "utils/helpers";

const EquipmentForm = ({setshowServForm}: {setshowServForm: Dispatch<SetStateAction<boolean>>}) => {
    return (
        <>
            {/* Modal component */}
            <div className="equipment-modal mt-5">
                <div className="d-flex justify-content-between equipment-model__header">
                    <h3>Add Service Charge</h3>
                    <button className="btn" onClick={()=>setshowServForm(false)}>
                        <FontAwesomeIcon icon={faXmark} className='svg-icon-cross'/>
                    </button>
                </div>
                <div className="equipment-form">
                    <Formik
                        initialValues={EquipmentFormData}
                        validationSchema={equipmentFormSchema}
                        onSubmit={async (values) => {
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <div className="d-flex justify-content-between align-items-end flex-column flex-md-row">
                                    <div className="d-flex flex-column">
                                        <Row>
                                            <Col lg={6}>
                                                <InputField
                                                    type="text"
                                                    name="chargeFor"
                                                    labelName="Charge For"
                                                    min="1"
                                                    error={errors.chargeFor}
                                                    touch={touched.chargeFor}
                                                    placeHolder="Enter your service"
                                                />
                                            </Col>
                                            <Col lg={4}>
                                                <InputField
                                                    type="number"
                                                    name="price"
                                                    labelName="Your Price"
                                                    min="1"
                                                    error={errors.price}
                                                    touch={touched.price}
                                                    placeHolder="Enter your price"
                                                />
                                            </Col>
                                        </Row>
                                        <Col lg={10}>
                                            <InputField
                                                name="remarks"
                                                labelName="Remarks"
                                                touch={touched.remarks}
                                                error={errors.remarks}
                                                placeHolder="Give your Remarks here"
                                                as="textarea"
                                            />
                                        </Col>
                                    </div>
                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Add Charges"
                                        className="submit-btn h-25 mb-5"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};
export default EquipmentForm;

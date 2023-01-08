import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PostCard } from "@components/PostTask/PostCard";
import { KYCIncompleteToast } from "@components/toasts/KYCIncompleteToast";
import { useQueryClient } from "@tanstack/react-query";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { Form, Formik } from "formik";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useBookNowTask } from "hooks/task/use-book--now-task";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import type { BookNowModalCardProps } from "types/bookNow";
import { applyFormSchema } from "utils/formValidation/applyFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

import { db } from "../../firebase/firebase";

const AppliedForm = ({
    service_id,
    title,
    budget_from,
    budget_to,
    tasker_id,
    budget_type,
    description,
    tasker_name,
    tasker_img,
    show,
    currency,
    setShow,
    handleClose,
}: BookNowModalCardProps) => {
    const router = useRouter();
    const { mutate, isLoading } = useBookNowTask();

    // const loadingOverlayVisible = useMemo(
    //     () => applyTaskLoading,
    //     [applyTaskLoading]
    // );

    // if (loadingOverlayVisible)
    //     return (
    //         <LoadingOverlay
    //             visible={loadingOverlayVisible}
    //             className={classes.overlay}
    //             overlayBlur={2}
    //         />
    //     );
    interface ApplyTaskPayload {
        entity_service: string;
        description: string;
        budget_to: number;
    }
    const queryClient = useQueryClient();

    const { data: user } = useUser();

    const { data: profile } = useGetProfile();

    const userFullName =
        (profile?.user &&
            profile?.user?.first_name + " " + profile?.user?.middle_name) ??
        "" + " " + profile?.user?.last_name;

    const handleRoomcreate = async () => {
        if (user?.id) {
            const combinedId =
                user?.id > tasker_id
                    ? user?.id + tasker_id
                    : tasker_id + user?.id;

            try {
                const res = await getDoc(doc(db, "chats", combinedId));

                if (!res.exists()) {
                    await setDoc(doc(db, "chats", combinedId), {
                        messages: [],
                    });

                    try {
                        await updateDoc(doc(db, "userChats", user?.id), {
                            [combinedId + ".userInfo"]: {
                                uid: tasker_id,
                                displayName: tasker_name,
                                photoURL: tasker_img,
                            },
                            [combinedId + ".date"]: serverTimestamp(),
                        });
                    } catch (error) {
                        console.log(
                            "🚀 ~ file: MyBookings.tsx ~ line 109 ~ handleRoomcreate ~ error",
                            error
                        );
                    }

                    await updateDoc(doc(db, "userChats", tasker_id), {
                        [combinedId + ".userInfo"]: {
                            uid: user?.id,
                            displayName: userFullName,
                            photoURL: profile?.user?.profile_image,
                        },
                        [combinedId + ".date"]: serverTimestamp(),
                    });
                }
            } catch (error) {
                toast.error("Chat Room creation failed");
            }
        }
    };
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Task Details</h3>
                    <div className="applied-modal__details">
                        <h4>
                            Title: <span>{title}</span>
                        </h4>

                        <h4>
                            Price:{" "}
                            <span>
                                {currency?.code} &nbsp;
                                {budget_from ? budget_from + " - " : ""}
                                {budget_to}{" "}
                                {budget_type === "Hourly"
                                    ? "/hr"
                                    : budget_type === "Monthly"
                                    ? "/mn"
                                    : budget_type === "Daily"
                                    ? "/daily"
                                    : "/project"}
                            </span>
                        </h4>
                        <h4>{description && parse(description)}</h4>
                    </div>
                    <Formik
                        initialValues={{
                            price: "",
                            remarks: "",
                            prerequesties: [],
                            recursion: "",
                            budget_to: budget_to,
                        }}
                        validationSchema={() =>
                            applyFormSchema({
                                budget_from: budget_from ?? 0,
                                budget_to: budget_to ?? 100000000,
                            })
                        }
                        onSubmit={async (values) => {
                            const applyTaskPayload: ApplyTaskPayload = {
                                entity_service: service_id ?? "",
                                budget_to: values.budget_to ?? parseInt(""),
                                description: values.remarks,
                                // pre_requisites: JSON.stringify(
                                //     values.prerequesties
                                // ),
                            };
                            mutate(applyTaskPayload, {
                                onSuccess: () => {
                                    toast.success(
                                        "You have successfully applied for task"
                                    );
                                    queryClient.invalidateQueries([
                                        "get-my-applicants",
                                    ]);
                                    queryClient.invalidateQueries([
                                        "my-requested-task",
                                    ]);

                                    queryClient.invalidateQueries([
                                        "approved-task",
                                    ]);
                                    //toggleSuccessModal();
                                    setShow(false);
                                    router.push("/home");

                                    handleRoomcreate();
                                },
                                onError: (error) => {
                                    setShow(false);
                                    if (!user?.is_kyc_verified) {
                                        toast.showComponent(
                                            "KYC Incomplete",
                                            <KYCIncompleteToast />
                                        );
                                        return;
                                    }
                                    toast.error(error.message);
                                },
                            });
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                {!budget_from ? (
                                    ""
                                ) : (
                                    <Row>
                                        <Col md={6}>
                                            <InputField
                                                labelName="Budget"
                                                type="number"
                                                name="budget_to"
                                                error={errors.budget_to}
                                                touch={touched.budget_to}
                                                min={budget_from}
                                                max={budget_to}
                                                placeHolder="Your Price"
                                                fieldRequired
                                            />
                                        </Col>
                                    </Row>
                                )}

                                <InputField
                                    name="remarks"
                                    labelName="Remarks"
                                    touch={touched.remarks}
                                    error={errors.remarks}
                                    placeHolder="Remarks ..."
                                    as="textarea"
                                />

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
                                        name="Apply"
                                        className="submit-btn"
                                        isLoading={isLoading}
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                    />
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
            />
        </>
    );
};
export default AppliedForm;

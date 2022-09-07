import { BreadCrumb } from "@components/common/BreadCrumb";
import FullPageLoader from "@components/common/FullPageLoader";
import { Tab } from "@components/common/Tab";
import UserProfileCard from "@components/common/UserProfile";
import Layout from "@components/Layout";
import AboutProfile from "@components/Profile/AboutProfile";
import UserActivities from "@components/Profile/Activities";
import UserDocument from "@components/Profile/Document";
import RewardCard from "@components/Profile/RewardCard";
import SavedBookings from "@components/Profile/SavedBookings";
import TasksProfileCard from "@components/Profile/TasksProfile";
import { dehydrate, QueryClient, useQueryClient } from "@tanstack/react-query";
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { UserProfileProps } from "types/userProfileProps";
const UserProfile: NextPage<UserProfileProps> = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const { data: profileDetails, isLoading, error } = useGetProfile();
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData(["profile"]);

    // const { data: userData } = useData<UserProfileProps["profileDetails"]>(
    //     ["profile"],
    //     "/tasker/profile/"
    // );
    // const profileDetails = userData?.data;

    // if (isLoading || !data) return <FullPageLoader />;

    const remaining = {
        userRating: 4,
        userBadge: "Gold",
        userPoints: 58,
        pointGoal: 42,
        happyClients: 24,
        successRate: 30,
        userReviews: 14,
        tooltipMessage: "Tooltip Message will show up here",
        taskCompleted: 30,
        userActiveStatus: true,
    };

    if (!profileDetails) {
        return (
            <>
                <Layout title="Profile | Cipher">
                    <Container fluid="xl" className="px-5">
                        <BreadCrumb currentPage="Profile" />
                        <Row className="row-create-profile">
                            <Col className="create-profile">
                                <h1>Your profile is incomplete!</h1>
                                <p>
                                    Fill in the details to Complete your profile
                                    and get started with tasks.
                                </p>
                                <button className="btn-create-profile">
                                    <Link
                                        href={"settings/account/individual"}
                                        className="text-profile"
                                    >
                                        Complete Profile Now
                                    </Link>
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </Layout>
            </>
        );
    }

    return (
        <Layout title="Profile | Cipher">
            <Container fluid="xl" className="px-5">
                <section className="user-profile">
                    <BreadCrumb currentPage="Profile" />

                    {/* Explore top container start */}

                    <section className="user-profile__top-container">
                        <UserProfileCard
                            countryCode={profileDetails?.country}
                            key={profileDetails?.id}
                            userImage={
                                profileDetails?.profile_image ??
                                "/userprofile/unknownPerson.jpg"
                            }
                            userName={profileDetails?.full_name}
                            userJob={profileDetails?.user_type}
                            userRating={remaining.userRating}
                            userPrice={profileDetails?.hourly_rate}
                            userLocation={profileDetails?.address_line1}
                            userPhone={profileDetails?.phone}
                            userEmail={profileDetails?.user?.email}
                            moreServices={profileDetails?.skill}
                            activeFrom={profileDetails?.active_hour_start}
                            activeTo={profileDetails?.active_hour_end}
                            userBio={profileDetails?.bio}
                            userBadge={remaining.userBadge}
                            userPoints={remaining.userPoints}
                            pointGoal={remaining.pointGoal}
                            happyClients={profileDetails?.stats?.happy_clients}
                            successRate={profileDetails?.stats?.success_rate}
                            userReviews={profileDetails?.stats?.user_reviews}
                            taskCompleted={
                                profileDetails?.stats?.task_completed
                            }
                            userActiveStatus={remaining.userActiveStatus}
                            tooltipMessage={remaining.tooltipMessage}
                            isProfileVerified={
                                profileDetails?.is_profile_verified
                            }
                        />
                    </section>

                    <section className="user-profile__bottom-container">
                        <div className="tabs">
                            <Tab
                                activeIndex={activeTabIdx}
                                onTabClick={setActiveTabIdx}
                                items={[
                                    {
                                        title: "About",
                                        content: <AboutProfile />,
                                    },
                                    {
                                        title: "Services",
                                        content: <TasksProfileCard />,
                                    },
                                    {
                                        title: "Saved",
                                        content: <SavedBookings />,
                                    },
                                    {
                                        title: "Documents",
                                        content: <UserDocument />,
                                    },
                                    {
                                        title: "Activities",
                                        content: <UserActivities />,
                                    },
                                    {
                                        title: "Rewards",
                                        content: <RewardCard />,
                                    },
                                ]}
                            />
                        </div>
                    </section>
                </section>
            </Container>
        </Layout>
    );
};

export default UserProfile;

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();
    try {
        await Promise.all([
            queryClient.prefetchQuery(["tasker-certification"]),
            queryClient.prefetchQuery(["tasker-education"]),
            queryClient.prefetchQuery(["tasker-experience"]),
            queryClient.prefetchQuery(["tasker-portfolio"]),
            queryClient.prefetchQuery(["profile"]),
            queryClient.prefetchQuery(["tasker-rating"]),
            queryClient.prefetchQuery(["tasker-document"]),
        ]);
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    } catch (err) {
        return {
            props: {
                certificationData: [],
                educationData: [],
                experienceData: [],
                profile: [],
                ratingData: [],
                documentData: [],
            },
        };
    }
};

// import DragDrop from "@components/common/DragDrop";
// import FormButton from "@components/common/FormButton";
// import InputField from "@components/common/InputField";
// import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Form, Formik } from "formik";
// import { useForm } from "hooks/use-form";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import type { Dispatch, SetStateAction } from "react";
// import { useState } from "react";
// import { Col, Row } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import OtpInput from "react-otp-input";
// import { toast } from "react-toastify";
// import { isSubmittingClass } from "utils/helpers";
// import * as Yup from "yup";

// interface AuthenticationModalCardProps {
//     show?: boolean;
//     handleClose?: () => void;
//     setShowForm: Dispatch<SetStateAction<boolean>>;
// }
// interface AuthProps {
//     otp?: string;
//     phone: string;
// }
// const AuthenticationData: AuthProps = {
//     otp: "",
//     phone: "",
// };

// const strReqOnly = Yup.string().required("Required field");

// const schema = Yup.object().shape({
//     otp: strReqOnly,
// });
// const AuthenticationModalCard = ({
//     handleClose,
//     show,
//     phone,
//     setShowForm,
// }: AuthenticationModalCardProps & AuthProps) => {
//     const router = useRouter();
//     const { mutate } = useForm(`/user/reset/otp/verify/`);

//     const [otpNum, setOTPNum] = useState("");

//     const handleSubmit = () => {
//         console.log("values=");
//         const dataToSend = {
//             otp: otpNum,
//             scope: "verify",
//             phone: phone,
//         };
//         console.log(dataToSend);
//         // mutate(dataToSend, {
//         //     onSuccess: async () => {
//         //         toast.success("OTP verified!");
//         //         setShowForm(false);
//         //         router.push("/login");
//         //     },
//         //     onError: async (error) => {
//         //         toast.error(error.message);
//         //     },
//         // });
//     };
//     return (
//         <>
//             {/* Modal component */}
//             <Modal show={show} centered onHide={handleClose} backdrop="static">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Enter your verification otp</Modal.Title>
//                 </Modal.Header>

//                 <div className="modal-body-content">
//                     <div className="details"></div>
//                     {/* <Formik
//                         initialValues={AuthenticationData}
//                         validationSchema={schema}
//                         // onSubmit={async (values) => {
//                         //     console.log("values=", values);
//                         //     const dataToSend = {
//                         //         otp: otpNum,
//                         //         scope: "verify",
//                         //         phone: phone,
//                         //     };
//                         //     console.log(dataToSend);
//                         //     mutate(dataToSend, {
//                         //         onSuccess: async () => {
//                         //             toast.success("OTP verified!");
//                         //             setShowForm(false);
//                         //             router.push("/login");
//                         //         },
//                         //         onError: async (error) => {
//                         //             toast.error(error.message);
//                         //         },
//                         //     });

//                         //     console.log(values);
//                         // }}
//                     >
//                         {({ isSubmitting, errors, touched }) => ( */}
//                     <Form>
//                         <div className="problem">
//                             <h4>OTP:</h4>
//                             {/* <InputField
//                                         type="string"
//                                         name="otp"
//                                         error={errors.otp}
//                                         touch={touched.otp}
//                                         placeHolder="Your otp"
//                                     /> */}
//                             <OtpInput
//                                 value={otpNum}
//                                 onChange={() => setOTPNum(otpNum)}
//                                 numInputs={8}
//                                 separator={
//                                     <span style={{ width: "8px" }}></span>
//                                 }
//                                 isInputNum={true}
//                                 shouldAutoFocus={true}
//                                 inputStyle={{
//                                     border: "1px solid #ccc",
//                                     borderRadius: "8px",
//                                     width: "54px",
//                                     height: "54px",
//                                     fontSize: "18px",
//                                     color: "#111",
//                                     fontWeight: "500",
//                                     caretColor: "blue",
//                                 }}
//                                 focusStyle={{
//                                     border: "1px solid #CFD3DB",
//                                     outline: "none",
//                                 }}
//                             />
//                         </div>

//                         <Modal.Footer>
//                             <Button
//                                 className="btn close-btn"
//                                 onClick={handleClose}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 className="submit-btn w-25"
//                                 onClick={handleSubmit}
//                             >
//                                 Submit
//                             </Button>
//                             {/* <FormButton
//                                         type="submit"
//                                         variant="primary"
//                                         name="Submit"
//                                         className="submit-btn w-25"
//                                         isSubmitting={isSubmitting}
//                                         isSubmittingClass={isSubmittingClass(
//                                             isSubmitting
//                                         )}
//                                         onClick={handleClose}
//                                     /> */}
//                         </Modal.Footer>
//                     </Form>
//                     {/* )}
//                     </Formik> */}
//                 </div>
//             </Modal>
//         </>
//     );
// };
// export default AuthenticationModalCard;

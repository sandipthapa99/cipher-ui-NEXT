import Breadcrum from "@components/common/Breadcrum";
import BigButton from "@components/common/Button";
import Layout from "@components/Layout";
import { withAuth } from "hoc/withAuth";
import Image from "next/image";
import { Container } from "react-bootstrap";

const HowToFindTasks = () => {
    return (
        <Layout title="How to find tasks | Cipher">
            <Breadcrum currentPage="How to find tasks" />
            <Container fluid="xl">
                <section className="find-tasks-hero"></section>

                <section className="discover-page__top-container">
                    <div className="gradient"></div>
                    <figure className="thumbnail-img">
                        <Image
                            src="/discover/main.svg"
                            layout="fill"
                            objectFit="cover"
                            alt="oppurtunities-page-main-image"
                        />
                    </figure>
                    <div className="overlay">
                        <h1>
                            A client tasks are quickly finished when searched
                            through Cipher
                        </h1>
                        <div className="bottom-content">
                            <p>
                                “Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry. Lorem Ipsum
                                has been the industry standard dummy text ever
                                since the 1500.
                            </p>
                            <BigButton
                                btnTitle="Join Us"
                                backgroundColor="#fff"
                            />
                            {/* <Button className="btn">Join Us</Button> */}
                        </div>
                    </div>
                </section>
            </Container>
        </Layout>
    );
};
export default withAuth(HowToFindTasks);

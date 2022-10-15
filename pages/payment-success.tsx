import Layout from "@components/Layout";
import { faThumbsUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Button, Container } from "react-bootstrap";

const PaymentSuccess = () => {
    return (
        <Layout title="Payment Success | Homaale">
            <Container fluid="xl" className="px-5">
                <div className="py-5 text-center bg-white success-content">
                    <FontAwesomeIcon icon={faThumbsUp} className="svg-icon" />
                    <div className="success-text">
                        <h5>Payment SuccessFull</h5>
                        <p>Payment was SuccessFull</p>
                    </div>

                    <div className="btn-continue">
                        <Link href={"/"}>
                            <a>
                                <Button variant="light" className="cont-btn">
                                    Return to Home Page
                                </Button>
                            </a>
                        </Link>
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export default PaymentSuccess;

import Layout from "@components/Layout";
import { Button } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

const PyamentFailure = () => {
    const router = useRouter();
    const navigateToCheckout = () => router.push("/home?activeTab=3");

    return (
        <>
            <Layout
                title="Payment Verification | Homaale"
                description="Homaale is a platform designed to provide service booking solutions to the
            service seekers and business opportunities to various service providing companies by bridging a gap between them.
             It covers a wide range of services from various industries like Accounting, Gardening,
            Health, Beauty, and many more."
                keywords="homaale, airtasker-nepali,nepali-working-platform, homaale-payment, ecommerce, homaale-feeback, business, online-business"
            >
                <Container fluid="xl" className="px-4">
                    <div>
                        <div
                            className="d-flex align-items-center justify-content-center flex-column"
                            style={{
                                backgroundColor: "#Fff",
                                borderRadius: "0.4rem",
                                margin: "3.2rem",
                                padding: "3.2rem",
                            }}
                        >
                            <Image
                                src="/payment-failure.svg"
                                width={400}
                                height={400}
                                alt="payment failure"
                            />
                            <h1>Payment Failed!</h1>
                            <p className="mb-0">
                                An error occured during your payment.
                            </p>
                            <p>Please try again.</p>
                            <Button
                                color="yellow"
                                onClick={navigateToCheckout}
                                // leftIcon={
                                //     <DashboardOutlined className="svg-icon me-0" />
                                // }
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    );
};

export default PyamentFailure;

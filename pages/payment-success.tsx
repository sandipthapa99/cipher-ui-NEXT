import Layout from "@components/Layout";
import { faDashboard } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, createStyles, Text, Title } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

const PaymentSuccess = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const navigateToDashboard = () => router.push("/home");

    return (
        <Layout title="Payment Success | Homaale">
            <Container fluid="xl" className="px-5">
                <div className={classes.wrapper}>
                    <div className={classes.body}>
                        <Title
                            sx={{ color: "green" }}
                            className={classes.title}
                        >
                            Payment Successful !
                        </Title>
                        <Text
                            sx={{ maxWidth: "45rem", lineHeight: "2.5rem" }}
                            size="md"
                            color="dimmed"
                        >
                            Thank you for your payment. Your payment has been
                            successfully processed and a receipt for your
                            purchase has been emailed to you.You can visit your
                            dashboard to view your orders.
                        </Text>
                        <div className={classes.controls}>
                            <Button
                                color="yellow"
                                onClick={navigateToDashboard}
                                leftIcon={
                                    <FontAwesomeIcon icon={faDashboard} />
                                }
                            >
                                Go to Dashboard
                            </Button>
                        </div>
                    </div>
                    <Image
                        src="/payment_success.svg"
                        width={400}
                        height={400}
                        alt="payment success screen"
                        className={classes.image}
                    />
                </div>
            </Container>
        </Layout>
    );
};
const useStyles = createStyles((theme) => ({
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBlock: theme.spacing.xl,
        padding: theme.spacing.xl * 2,
        borderRadius: theme.radius.md,
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        border: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[3]
        }`,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            flexDirection: "column-reverse",
            padding: theme.spacing.xl,
        },
    },
    image: {
        maxWidth: "40%",

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: "100%",
        },
    },
    body: {
        paddingRight: theme.spacing.xl * 4,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            paddingRight: 0,
            marginTop: theme.spacing.xl,
        },
    },
    title: {
        color: theme.colorScheme === "dark" ? theme.colors.green : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
        marginBottom: theme.spacing.md,
    },
    controls: {
        display: "flex",
        marginTop: theme.spacing.xl,
    },
    inputWrapper: {
        width: "100%",
        flex: "1",
    },
    input: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
    },
}));

export default PaymentSuccess;

import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import { PaymentHistory } from "@components/Payment/PaymentHistory";

const Payment = () => {
    return (
        <Layout title="Payment History">
            <Breadcrum currentPage="Payment History" />
            <PaymentHistory />
        </Layout>
    );
};
export default Payment;

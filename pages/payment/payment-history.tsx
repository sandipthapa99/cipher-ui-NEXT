import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { PaymentHistory } from "@components/Payment/PaymentHistory";

const Payment = () => {
    return (
        <Layout title="Payment History">
            <BreadCrumb currentPage="Payment History" />
            <PaymentHistory />
        </Layout>
    );
};
export default Payment;

import { BreadCrumb } from "@components/common/BreadCrumb";
import { EarnMoneyProfessional } from "@components/EarnMoney/EarnMoneyProfessional";
import Layout from "@components/Layout";
import React from "react";

const EarnMoney = () => {
    return (
        <Layout
            title="Earn Money | Homaale"
            description="Provide service, complete task and earn the money in homaale."
            keywords="homaale-earn-money airtasker-nepali, nepali-working-platform"
        >
            <div className="earn-money-page">
                <BreadCrumb currentPage={"Earn money as professional"} />
                <EarnMoneyProfessional />
            </div>
        </Layout>
    );
};

export default EarnMoney;

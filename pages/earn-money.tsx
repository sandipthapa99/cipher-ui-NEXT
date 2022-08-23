import { BreadCrumb } from "@components/common/BreadCrumb";
import { EarnMoneyProfessional } from "@components/EarnMoney/EarnMoneyProfessional";
import React from "react";

const EarnMoney = () => {
    return (
        <div className="earn-money-page">
            <BreadCrumb currentPage={"Earn money as professional"} />
            <EarnMoneyProfessional />
        </div>
    );
};

export default EarnMoney;

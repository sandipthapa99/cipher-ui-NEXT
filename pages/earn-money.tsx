import { BreadCrumb } from "@components/common/BreadCrumb";
import { EarnMoneyProfessional } from "@components/EarnMoney/EarnMoneyProfessional";
import React from "react";

const EarnMoney = () => {
    return (
        <>
            <BreadCrumb currentPage={"Earn money as professional"} />
            <EarnMoneyProfessional />
        </>
    );
};

export default EarnMoney;

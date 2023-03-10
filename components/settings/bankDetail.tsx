import {
    AccountBalanceOutlined,
    Edit,
    LinkOutlined,
} from "@mui/icons-material";
import { useData } from "hooks/use-data";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { UserBankDetails } from "types/bankDetail";
import { capitalise } from "utils/capitalise";

import BankForm from "./AddBankForm";

interface Display {
    showBankForm?: boolean;
    showPrimaryBank?: boolean;
}
const AddBank = ({ showBankForm, showPrimaryBank }: Display) => {
    const { data: BankDetails } = useData<UserBankDetails>(
        ["tasker-bank-account"],
        "/tasker/bank-details/"
    );

    const LinkedBank = BankDetails?.data.result;

    const primaryBank = LinkedBank?.find((bank) => bank.is_primary === true);

    const [primaryBankId, setPrimaryBankId] = useState<number>();
    const [bankDetail, setBankDetail] = useState<any>();
    const [edit, setEdit] = useState(false);
    return (
        <div
            className="bank-details"
            style={showBankForm ? { display: "block" } : { display: "none" }}
        >
            <div className="content">
                <h3>Bank Details</h3>
                <div
                    style={
                        showPrimaryBank
                            ? { display: "block" }
                            : { display: "none" }
                    }
                >
                    {primaryBank ? (
                        <>
                            <h5>Your Primary Bank</h5>
                            <Row>
                                <Col md={6} lg={4}>
                                    <div className="d-flex account-wrapper bank card-block">
                                        <Edit
                                            className="svg-icon edit-icon"
                                            onClick={() => {
                                                setPrimaryBankId(
                                                    primaryBank?.id
                                                );
                                                setBankDetail(primaryBank);
                                                setEdit(true);
                                            }}
                                        />
                                        <div className="account-info">
                                            <figure className="thumbnail-img">
                                                <Image
                                                    src={
                                                        primaryBank?.bank_name
                                                            .logo
                                                            ? primaryBank
                                                                  .bank_name
                                                                  .logo
                                                            : "/settings/bank.svg"
                                                    }
                                                    layout="fill"
                                                    height={45}
                                                    width={45}
                                                    objectFit="contain"
                                                    alt="bank-icon"
                                                />
                                            </figure>
                                            <p>
                                                {capitalise(
                                                    `${primaryBank?.bank_name.name.toLowerCase()}`
                                                )}
                                            </p>
                                        </div>
                                        <div className="linked">
                                            <div className="primary">
                                                <AccountBalanceOutlined className="svg-icon" />
                                            </div>

                                            <div className="linked-icons">
                                                <LinkOutlined className="svg-icon" />
                                                <a href="" className="link">
                                                    {primaryBank.is_verified
                                                        ? "Linked"
                                                        : "Pending"}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <BankForm
                id={primaryBankId}
                isEdit={edit}
                bankDetail={bankDetail}
                showBankForm={showBankForm}
            />
        </div>
    );
};

export default AddBank;

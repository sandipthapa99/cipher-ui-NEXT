import { faPencil } from "@fortawesome/pro-regular-svg-icons";
import { faBuildingColumns } from "@fortawesome/pro-solid-svg-icons";
import { faLinkSimple } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "hooks/use-data";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { UserBankDetails } from "types/bankDetail";
import { capitalise } from "utils/capitalise";

import BankForm from "./AddBankForm";

interface Display {
    showBankForm: boolean;
}
const AddBank = ({ showBankForm }: Display) => {
    const { data: BankDetails } = useData<UserBankDetails>(
        ["tasker-bank-account"],
        "/tasker/bank-details/"
    );
    const LinkedBank = BankDetails?.data.result;
    const primaryBank = LinkedBank?.find((bank) => bank.is_primary === true);
    // console.log(
    //     "🚀 ~ file: bankDetail.tsx ~ line 21 ~ AddBank ~ primaryBank",
    //     primaryBank
    // );
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
                {primaryBank ? (
                    <>
                        <h5>Your Primary Bank</h5>
                        <Row>
                            <Col md={4}>
                                <div className="d-flex account-wrapper card-block">
                                    <FontAwesomeIcon
                                        icon={faPencil}
                                        className="svg-icon edit-icon"
                                        onClick={() => {
                                            setPrimaryBankId(primaryBank?.id);
                                            setBankDetail(primaryBank);
                                            setEdit(true);
                                        }}
                                    />
                                    <div className="account-info">
                                        <figure className="thumbnail-img">
                                            <Image
                                                src="/settings/bank.svg"
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
                                            <FontAwesomeIcon
                                                icon={faBuildingColumns}
                                                className="svg-icon"
                                            />
                                        </div>

                                        <div className="linked-icons">
                                            <FontAwesomeIcon
                                                icon={faLinkSimple}
                                                className="svg-icon"
                                            />
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

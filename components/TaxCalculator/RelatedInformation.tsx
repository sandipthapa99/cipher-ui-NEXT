import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import RelatedInfoModal from "./Popup";

const TaxIncomeData = [
    {
        id: 0,
        item: "What is Basic Salary?",
        modal: "BasicSalary",
        content: [
            "our 'Basic Salary' is the amount of salary paid to an employee without the addition of any benefits and reduction of any expenses.",
            "Added benefits usually include Dearness allowances, medical insurance, overtime pay, incentives, sales commission etc. Expenses that are deducted could include repayment of student loans or loans taken from company, charity donations, lunch subscriptions etc.",
            "Hence, your basic salary is the amount you would receive without the addition or deduction of any of the above, or anything else of a similar nature.",
            "Your basic salary remains fixed every month and is fully taxable.",
        ],
    },
    {
        id: 1,
        item: "What is PF?",
        modal: "PF",
        content: [
            "our 'PPF' is the amount of salary paid to an employee without the addition of any benefits and reduction of any expenses.",
            "Added benefits usually include Dearness allowances, medical insurance, overtime pay, incentives, sales commission etc. Expenses that are deducted could include repayment of student loans or loans taken from company, charity donations, lunch subscriptions etc.",
            "Hence, your basic salary is the amount you would receive without the addition or deduction of any of the above, or anything else of a similar nature.",
            "Your basic salary remains fixed every month and is fully taxable.",
        ],
    },
    {
        id: 2,
        item: "What is CIT?",
        modal: "CIT",
        content: [
            "our 'Basic Salary' is the amount of salary paid to an employee without the addition of any benefits and reduction of any expenses.",
            "Added benefits usually include Dearness allowances, medical insurance, overtime pay, incentives, sales commission etc. Expenses that are deducted could include repayment of student loans or loans taken from company, charity donations, lunch subscriptions etc.",
            "Hence, your basic salary is the amount you would receive without the addition or deduction of any of the above, or anything else of a similar nature.",
            "Your basic salary remains fixed every month and is fully taxable.",
        ],
    },
    {
        id: 3,
        item: "What is SSF?",
        modal: "SSF",
        content: [
            "our 'Basic Salary' is the amount of salary paid to an employee without the addition of any benefits and reduction of any expenses.",
            "Added benefits usually include Dearness allowances, medical insurance, overtime pay, incentives, sales commission etc. Expenses that are deducted could include repayment of student loans or loans taken from company, charity donations, lunch subscriptions etc.",
            "Hence, your basic salary is the amount you would receive without the addition or deduction of any of the above, or anything else of a similar nature.",
            "Your basic salary remains fixed every month and is fully taxable.",
        ],
    },
    {
        id: 4,
        item: "What is Allowance?",
        modal: "Allowance",
        content: [
            "our 'Basic Salary' is the amount of salary paid to an employee without the addition of any benefits and reduction of any expenses.",
            "Added benefits usually include Dearness allowances, medical insurance, overtime pay, incentives, sales commission etc. Expenses that are deducted could include repayment of student loans or loans taken from company, charity donations, lunch subscriptions etc.",
            "Hence, your basic salary is the amount you would receive without the addition or deduction of any of the above, or anything else of a similar nature.",
            "Your basic salary remains fixed every month and is fully taxable.",
        ],
    },
    {
        id: 5,
        item: "What is Salary Taxable?",
        modal: "SalaryTaxable",
        content: [
            "our 'Basic Salary' is the amount of salary paid to an employee without the addition of any benefits and reduction of any expenses.",
            "Added benefits usually include Dearness allowances, medical insurance, overtime pay, incentives, sales commission etc. Expenses that are deducted could include repayment of student loans or loans taken from company, charity donations, lunch subscriptions etc.",
            "Hence, your basic salary is the amount you would receive without the addition or deduction of any of the above, or anything else of a similar nature.",
            "Your basic salary remains fixed every month and is fully taxable.",
        ],
    },
];

const RelatedInfo = () => {
    //for  modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [modalId, setModalId] = useState(0);

    const handleModalClick = (id: number) => {
        setModalId(id);
        setShow(true);
    };

    const modalData = TaxIncomeData.find((item) => item.id == modalId);
    return (
        <div className="related-card-block">
            <Row>
                <Col md={6}>
                    <h2>Related Information</h2>
                    {TaxIncomeData.map((info, i) => (
                        <div key={info.id}>
                            <p
                                onClick={() => {
                                    handleModalClick(info.id);
                                }}
                            >
                                {info.item}
                            </p>
                        </div>
                    ))}
                    <RelatedInfoModal
                        title={modalData ? modalData?.item : ""}
                        desc={modalData ? modalData.content : []}
                        show={show}
                        handleClose={handleClose}
                    />
                </Col>
            </Row>
        </div>
    );
};
export default RelatedInfo;

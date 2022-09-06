import { Col, Row } from "react-bootstrap";

const TaxIncomeData = [
    "Salary(with Grade)",
    "Bonus",
    "Over Time Payment",
    "Entertainment and Transportation Allowance",
    "Leave Pay",
    "Prizes, Gifts",
    "Payment and Other Facilitations",
    "Dearness Allowances",
    "Cost of Living Allowances",
    "Rent Allowances",
];
const TaxSavingData = [
    "Provident Fund",
    "Citizen Investment Trust",
    "Social Security Fund",
    "Life Insurance",
    "Donations",
];

const TaxCalculatorInfo = () => {
    return (
        <div className="tax-card-block">
            <Row>
                <Col md={6}>
                    <h2>Taxable Income Source</h2>
                    {TaxIncomeData.map((info, i) => (
                        <p key={i}>{info}</p>
                    ))}
                </Col>
                <Col md={6}>
                    <h2>Tax Saving Component</h2>
                    {TaxSavingData.map((info, i) => (
                        <p key={i}>{info}</p>
                    ))}
                </Col>
            </Row>
        </div>
    );
};
export default TaxCalculatorInfo;

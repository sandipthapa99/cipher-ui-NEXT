import {
    faFilterList,
    faMagnifyingGlass,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

const SearchBySort = () => {
    return (
        <Row className="recommended-tab">
            <Col md={11} className="recommended">
                <span>Recommended</span>
                <span>In Progess</span>
                <span>History</span>
            </Col>
            <Col md={1} className="recommended-icon">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        verticalAlign: "middle",
                        display: "inline-block",
                        fontSize: "18px",
                        color: "#000",
                    }}
                />
                <FontAwesomeIcon
                    icon={faFilterList}
                    style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        verticalAlign: "middle",
                        display: "inline-block",
                        fontSize: "18px",
                        color: "#000",
                    }}
                />
            </Col>
        </Row>
    );
};
export default SearchBySort;

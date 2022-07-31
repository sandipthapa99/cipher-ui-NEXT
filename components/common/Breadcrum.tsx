import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";

const Breadcrum = ({
    currentPage,
    subPage,
    hasSubPage,
}: {
    currentPage: string | undefined;
    subPage?: string;
    hasSubPage?: boolean;
}) => {
    return (
        <>
            <Container fluid="xl">
                <div className="breadcrum-text">
                    <div className="d-flex align-items-center">
                        <span>Home</span>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className="svg-icon"
                        />

                        {hasSubPage ? (
                            <>
                                <span>{currentPage}</span>
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="svg-icon"
                                />
                                {subPage}
                            </>
                        ) : (
                            <p>{currentPage}</p>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
};
export default Breadcrum;

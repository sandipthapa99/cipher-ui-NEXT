import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";

const Breadcrum = ({currentPage}:{currentPage:string}) => {
    return(
        <>
        <Container fluid="xl">
            <div className="breadcrum-text">
                <p><span>Home</span> 
                <FontAwesomeIcon icon={faChevronRight} className="svg-icon"/> 
                {currentPage}</p>
            </div>
        </Container>
        </>
    )
}
export default Breadcrum;
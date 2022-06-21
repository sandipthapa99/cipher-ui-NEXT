import { Button } from "react-bootstrap";

const CardBtn = ({btnTitle}: {btnTitle:string}) => {
    return(
        <>
            <Button className="card-btn"><span>{btnTitle}</span></Button>
        </>
    )
}
export default CardBtn;
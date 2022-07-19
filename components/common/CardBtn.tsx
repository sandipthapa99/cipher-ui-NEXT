import { Button } from 'react-bootstrap';

const CardBtn = ({
	btnTitle,
	backgroundColor,
}: {
	btnTitle: string;
	backgroundColor: string;
}) => {
	return (
		<>
			<Button className="card-btn" style={{ backgroundColor: `${backgroundColor}` }}>
				<span>{btnTitle}</span>
			</Button>
		</>
	);
};
export default CardBtn;
